# Smart Git Push with Automatic Fast Proxy Detection
param([string]$branch = "main")

$proxyPort = 7897
$isProxyAlive = $false

try {
    $tcp = New-Object System.Net.Sockets.TcpClient
    $iar = $tcp.BeginConnect("127.0.0.1", $proxyPort, $null, $null)
    $success = $iar.AsyncWaitHandle.WaitOne(600, $false)
    if ($success) {
        $tcp.EndConnect($iar)
        $isProxyAlive = $true
    }
    $tcp.Close()
} catch {
    $isProxyAlive = $false
}

if ($isProxyAlive) {
    Write-Host "[Smart-Push] Detected active proxy at 127.0.0.1:$proxyPort. Routing via high-speed proxy..." -ForegroundColor Green
    git config --local http.proxy "http://127.0.0.1:$proxyPort"
    git config --local https.proxy "http://127.0.0.1:$proxyPort"
} else {
    Write-Host "[Smart-Push] Proxy not active. Falling back to direct connection..." -ForegroundColor Yellow
    git config --local --unset http.proxy 2>$null
    git config --local --unset https.proxy 2>$null
}

git push origin $branch
