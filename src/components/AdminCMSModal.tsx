import React, { useState } from 'react';
import type { AIImageCase, AIVideoWorkflow, VideoWorkflowStep } from '../types/art';
import { 
  X, Plus, Trash2, Edit3, Save, RotateCcw, Download, ShieldCheck, 
  Film, Image as ImageIcon, Check, KeyRound 
} from 'lucide-react';
import { 
  saveImageCases, saveVideoWorkflows, exportAllDataAsJSON, resetToDefaults,
  isAdminAuthed, setAdminAuth 
} from '../data/workflowStore';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageCases: AIImageCase[];
  videoWorkflows: AIVideoWorkflow[];
  onUpdateImageCases: (cases: AIImageCase[]) => void;
  onUpdateVideoWorkflows: (workflows: AIVideoWorkflow[]) => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  imageCases,
  videoWorkflows,
  onUpdateImageCases,
  onUpdateVideoWorkflows,
}) => {
  const [isAuthed, setIsAuthed] = useState<boolean>(isAdminAuthed());
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'images' | 'videos' | 'backup'>('images');

  // Edit / Add Image State
  const [editingImage, setEditingImage] = useState<AIImageCase | null>(null);
  const [isAddingImage, setIsAddingImage] = useState(false);

  // Edit / Add Video Workflow State
  const [editingWorkflow, setEditingWorkflow] = useState<AIVideoWorkflow | null>(null);
  const [isAddingWorkflow, setIsAddingWorkflow] = useState(false);

  // Success Notice
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    playSuccessChime();
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  const VAULT_HASH = '59862fa8b4938b453edbd92404eb85242b273b8f23b7c071bb8ff9eac7c00a3d';

  const handleLogin = async () => {
    if (!passwordInput.trim()) {
      setAuthError(true);
      return;
    }
    try {
      const buffer = new TextEncoder().encode(passwordInput.trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      if (hash === VAULT_HASH) {
        playSuccessChime();
        setAdminAuth(true);
        setIsAuthed(true);
        setAuthError(false);
        setPasswordInput('');
      } else {
        setAuthError(true);
      }
    } catch (e) {
      setAuthError(true);
    }
  };
  // IMAGE HANDLERS
  const handleStartAddImage = () => {
    playSpotlightClick();
    setIsAddingImage(true);
    setEditingImage({
      id: `img-custom-${Date.now()}`,
      title: '新建 AI 风格提示词案例',
      category: '自定义风格',
      badge: '新录入',
      description: '详细描述该风格的画面特征与美学体验...',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      tags: ['AI生成', '新风格'],
      promptBlocks: {
        subject: 'a futuristic floating glass island, glowing cyberpunk lights',
        style: 'VOX 3D voxel diorama, isometric view',
        texture: 'cubic micro blocks, glossy water reflections',
        lighting: 'volumetric raytracing glow, warm amber lighting',
        composition: 'isometric tilt-shift view, centered, 8k render',
        parameters: '--ar 16:9 --v 6.1 --stylize 250',
        negative: 'blurry, 2D flat, low resolution',
      },
      fullPrompt: 'Detailed 3D voxel art diorama, futuristic floating glass island, glowing cyberpunk lights, cubic micro blocks, volumetric lighting --ar 16:9 --v 6.1',
      createdDate: new Date().toISOString().split('T')[0],
      author: '管理员录入',
    });
  };

  const handleSaveImage = () => {
    if (!editingImage) return;
    let updated: AIImageCase[];
    if (isAddingImage) {
      updated = [editingImage, ...imageCases];
    } else {
      updated = imageCases.map((c) => (c.id === editingImage.id ? editingImage : c));
    }
    saveImageCases(updated);
    onUpdateImageCases(updated);
    setEditingImage(null);
    setIsAddingImage(false);
    showToast('图片案例保存成功并已同步存储！');
  };

  const handleDeleteImage = (id: string) => {
    if (!window.confirm('确认删除此图片案例吗？')) return;
    playSpotlightClick();
    const updated = imageCases.filter((c) => c.id !== id);
    saveImageCases(updated);
    onUpdateImageCases(updated);
    showToast('图片案例已删除！');
  };

  // VIDEO WORKFLOW HANDLERS
  const handleStartAddWorkflow = () => {
    playSpotlightClick();
    setIsAddingWorkflow(true);
    setEditingWorkflow({
      id: `wf-custom-${Date.now()}`,
      title: '新建 AI 视频分步生成工作流',
      category: '动态图形与MG动画',
      badge: '新工作流',
      summary: '分步实现惊艳的 AI 视频成片，详细指导每一步所需工具与提示词。',
      previewVideoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      totalSteps: 2,
      difficulty: '进阶',
      toolsChain: ['Midjourney / Flux', 'Runway / Kling', 'After Effects'],
      author: '管理员录入',
      createdDate: new Date().toISOString().split('T')[0],
      steps: [
        {
          stepNumber: 1,
          stepTitle: '步骤一：第一步生成静态资产与分镜概念图',
          toolUsed: 'Midjourney v6.1 / Flux.1',
          toolCategory: 'image-gen',
          purpose: '确立主体与色彩基底，生成干净清晰的参考画面。',
          stepPrompt: 'A detailed 3D scene, clean composition, high fidelity --ar 16:9 --v 6.1',
          parameters: '--ar 16:9 --stylize 250',
          keyTechniques: ['保持背景纯净以便于后期处理', '固定构图视角防止形变'],
        },
        {
          stepNumber: 2,
          stepTitle: '步骤二：第二步使用视频模型生成运镜与微动',
          toolUsed: 'Runway Gen-3 / Kling 1.5 / Luma',
          toolCategory: 'video-gen',
          purpose: '赋予画面平滑的镜头推进或微动作。',
          stepPrompt: 'Smooth continuous camera dolly in, subtle ambient movement, high quality 1080p',
          parameters: 'Motion: 4, Camera: Push In',
          keyTechniques: ['运动强度保持适中', '强调禁止画面物体崩溃'],
        },
      ],
    });
  };

  const handleAddStepToEditingWorkflow = () => {
    if (!editingWorkflow) return;
    const nextStepNum = editingWorkflow.steps.length + 1;
    const newStep: VideoWorkflowStep = {
      stepNumber: nextStepNum,
      stepTitle: `步骤${nextStepNum}：第${nextStepNum}步是执行具体操作...`,
      toolUsed: 'After Effects / 剪映 Pro',
      toolCategory: 'post-edit',
      purpose: '完善节奏、音效与后期剪辑包装。',
      stepPrompt: 'BPM 120 节奏对齐，音效卡点，转场动效',
      parameters: 'Frame rate: 24fps',
      keyTechniques: ['添加背景音乐与环境音', '输出最终高清成片'],
    };
    setEditingWorkflow({
      ...editingWorkflow,
      steps: [...editingWorkflow.steps, newStep],
      totalSteps: editingWorkflow.steps.length + 1,
    });
  };

  const handleDeleteStep = (stepIdx: number) => {
    if (!editingWorkflow) return;
    const updatedSteps = editingWorkflow.steps
      .filter((_, i) => i !== stepIdx)
      .map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setEditingWorkflow({
      ...editingWorkflow,
      steps: updatedSteps,
      totalSteps: updatedSteps.length,
    });
  };

  const handleSaveWorkflow = () => {
    if (!editingWorkflow) return;
    let updated: AIVideoWorkflow[];
    if (isAddingWorkflow) {
      updated = [editingWorkflow, ...videoWorkflows];
    } else {
      updated = videoWorkflows.map((w) => (w.id === editingWorkflow.id ? editingWorkflow : w));
    }
    saveVideoWorkflows(updated);
    onUpdateVideoWorkflows(updated);
    setEditingWorkflow(null);
    setIsAddingWorkflow(false);
    showToast('视频工作流保存成功！');
  };

  const handleDeleteWorkflow = (id: string) => {
    if (!window.confirm('确认删除此视频工作流吗？')) return;
    playSpotlightClick();
    const updated = videoWorkflows.filter((w) => w.id !== id);
    saveVideoWorkflows(updated);
    onUpdateVideoWorkflows(updated);
    showToast('视频工作流已删除！');
  };

  const handleExportJSON = () => {
    playSpotlightClick();
    const jsonStr = exportAllDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `art-gallery-data-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('配置文件已成功导出下载！');
  };

  const handleReset = () => {
    if (!window.confirm('确定恢复出厂预设吗？您自定义的案例将被重置为官方默认内容。')) return;
    resetToDefaults();
    window.location.reload();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gallery-950 border border-gold-500/40 rounded-3xl shadow-gallery-lg overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-gallery-800 bg-gallery-900/90 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gold-500/20 text-gold-400 font-mono text-[10px] font-bold border border-gold-500/30">
                CURATOR VAULT // 私人策展工作台
              </span>
              {isAuthed && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  <ShieldCheck className="w-3 h-3" />
                  <span>已通过主密钥授权</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-gallery-100 mt-1">
              AI 视觉提示词与多步骤工作流典藏库
            </h2>
            <p className="text-xs text-gallery-400 font-sans mt-0.5">
              结构化管理图片拆解积木与视频链式生成管线，支持离线加密持久化与跨端导出。
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAuthed && (
              <button
                onClick={() => {
                  setAdminAuth(false);
                  setIsAuthed(false);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-gallery-900 border border-gallery-700 text-gallery-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                锁闭并登出
              </button>
            )}
            <button
              onClick={() => {
                playSpotlightClick();
                onClose();
              }}
              className="p-2.5 rounded-full bg-gallery-800 border border-gallery-700 text-gallery-300 hover:text-white hover:border-gold-500 transition-all cursor-pointer"
              title="关闭"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {saveSuccessMsg && (
          <div className="bg-emerald-600/90 text-white text-xs font-serif font-bold py-2 px-4 text-center animate-fadeIn flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Auth Gate (If not logged in) */}
        {!isAuthed ? (
          <div className="p-8 sm:p-14 text-center space-y-5 my-auto max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
              <KeyRound className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-serif font-bold text-gallery-100">
                CURATOR'S VAULT ACCESS
              </h3>
              <p className="text-xs text-gallery-400 font-sans leading-relaxed">
                此区域受高强度加密保护，请输入安全主授权密钥以解锁维护权限：
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="输入主授权密钥 (Master Key)"
                className="w-full px-4 py-2.5 bg-gallery-900 border border-gallery-700 rounded-xl text-xs text-gallery-100 text-center font-mono focus:outline-none focus:border-gold-500 shadow-inner"
              />
              {authError && <p className="text-xs text-accent-crimson font-mono animate-shake">⚠️ 鉴权失败：密钥不匹配，拒绝访问</p>}

              <button
                onClick={handleLogin}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-gallery-950 font-serif font-bold text-xs shadow-glow-gold hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
              >
                验证密钥并开启密室
              </button>
            </div>
          </div>
        ) : (
          /* Authed Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-gallery-800 bg-gallery-900/50 shrink-0">
              <button
                onClick={() => {
                  playSpotlightClick();
                  setActiveTab('images');
                  setEditingImage(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'images'
                    ? 'bg-gold-500 text-gallery-950 shadow-sm'
                    : 'text-gallery-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>图片提示词案例库 ({imageCases.length})</span>
              </button>

              <button
                onClick={() => {
                  playSpotlightClick();
                  setActiveTab('videos');
                  setEditingWorkflow(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'videos'
                    ? 'bg-gold-500 text-gallery-950 shadow-sm'
                    : 'text-gallery-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>视频分步工作流库 ({videoWorkflows.length})</span>
              </button>

              <button
                onClick={() => {
                  playSpotlightClick();
                  setActiveTab('backup');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'backup'
                    ? 'bg-gold-500 text-gallery-950 shadow-sm'
                    : 'text-gallery-400 hover:text-white'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>数据备份与导出</span>
              </button>
            </div>

            {/* Panel Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-left">
              {activeTab === 'images' && (
                <div className="space-y-6">
                  {editingImage ? (
                    <div className="p-6 rounded-2xl bg-gallery-900 border border-gold-500/50 space-y-5">
                      <div className="flex items-center justify-between border-b border-gallery-800 pb-3">
                        <h4 className="text-base font-serif font-bold text-gold-300">
                          {isAddingImage ? '新增 AI 图片风格案例' : `编辑案例：${editingImage.title}`}
                        </h4>
                        <button
                          onClick={() => setEditingImage(null)}
                          className="text-xs font-mono text-gallery-400 hover:text-white"
                        >
                          取消
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-gallery-300">案例名称:</label>
                          <input
                            type="text"
                            value={editingImage.title}
                            onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-gallery-300">风格分类 (如: VOX体素, 锈湖暗黑):</label>
                          <input
                            type="text"
                            value={editingImage.category}
                            onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-mono text-gallery-300">效果成图图片 URL:</label>
                          <input
                            type="text"
                            value={editingImage.imageUrl}
                            onChange={(e) => setEditingImage({ ...editingImage, imageUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100 font-mono"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-mono text-gallery-300">美学描述与要点:</label>
                          <textarea
                            rows={2}
                            value={editingImage.description}
                            onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gallery-800 space-y-3">
                        <h5 className="text-xs font-mono font-bold text-gold-400">
                          🧱 拆解式提示词积木设置:
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[11px] font-mono text-gold-300">[核心主体 · Subject]:</span>
                            <input
                              type="text"
                              value={editingImage.promptBlocks.subject}
                              onChange={(e) => setEditingImage({
                                ...editingImage,
                                promptBlocks: { ...editingImage.promptBlocks, subject: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100 font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[11px] font-mono text-accent-cyan">[流派风格 · Style]:</span>
                            <input
                              type="text"
                              value={editingImage.promptBlocks.style}
                              onChange={(e) => setEditingImage({
                                ...editingImage,
                                promptBlocks: { ...editingImage.promptBlocks, style: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100 font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[11px] font-mono text-accent-amber">[材质纹理 · Texture]:</span>
                            <input
                              type="text"
                              value={editingImage.promptBlocks.texture}
                              onChange={(e) => setEditingImage({
                                ...editingImage,
                                promptBlocks: { ...editingImage.promptBlocks, texture: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100 font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[11px] font-mono text-accent-violet">[光影氛围 · Lighting]:</span>
                            <input
                              type="text"
                              value={editingImage.promptBlocks.lighting}
                              onChange={(e) => setEditingImage({
                                ...editingImage,
                                promptBlocks: { ...editingImage.promptBlocks, lighting: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100 font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[11px] font-mono text-emerald-400">[构图视角 · Composition]:</span>
                            <input
                              type="text"
                              value={editingImage.promptBlocks.composition}
                              onChange={(e) => setEditingImage({
                                ...editingImage,
                                promptBlocks: { ...editingImage.promptBlocks, composition: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100 font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[11px] font-mono text-gallery-300">[参数 · Parameters]:</span>
                            <input
                              type="text"
                              value={editingImage.promptBlocks.parameters}
                              onChange={(e) => setEditingImage({
                                ...editingImage,
                                promptBlocks: { ...editingImage.promptBlocks, parameters: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100 font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3">
                        <button
                          onClick={() => setEditingImage(null)}
                          className="px-4 py-2 rounded-xl bg-gallery-800 text-gallery-300 text-xs font-serif"
                        >
                          取消
                        </button>
                        <button
                          onClick={handleSaveImage}
                          className="px-5 py-2 rounded-xl bg-gold-500 text-gallery-950 font-serif font-bold text-xs shadow-glow-gold hover:bg-gold-400 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>保存并更新案例</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-gallery-400">已录入案例列表 ({imageCases.length})</span>
                        <button
                          onClick={handleStartAddImage}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-500 text-gallery-950 font-serif font-bold text-xs shadow-glow-gold cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ 新增图片案例</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {imageCases.map((c) => (
                          <div key={c.id} className="p-3.5 rounded-xl bg-gallery-900 border border-gallery-800 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5 overflow-hidden">
                              <img src={c.imageUrl} alt={c.title} className="w-14 h-14 rounded-lg object-cover bg-black shrink-0 border border-gallery-700" />
                              <div className="overflow-hidden">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-serif font-bold text-gallery-100 truncate">{c.title}</span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gallery-950 border border-gallery-700 text-gold-300 shrink-0">{c.category}</span>
                                </div>
                                <p className="text-[11px] text-gallery-400 font-mono truncate max-w-lg mt-0.5">{c.promptBlocks.subject}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  playSpotlightClick();
                                  setEditingImage({ ...c });
                                  setIsAddingImage(false);
                                }}
                                className="p-2 rounded-lg bg-gallery-800 text-gallery-300 hover:text-gold-300 hover:border-gold-500 border border-gallery-700 cursor-pointer"
                                title="编辑"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteImage(c.id)}
                                className="p-2 rounded-lg bg-gallery-800 text-gallery-300 hover:text-accent-crimson hover:border-accent-crimson border border-gallery-700 cursor-pointer"
                                title="删除"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* TAB 2: MANAGE VIDEO WORKFLOWS */}
              {activeTab === 'videos' && (
                <div className="space-y-6">
                  {editingWorkflow ? (
                    <div className="p-6 rounded-2xl bg-gallery-900 border border-accent-violet/60 space-y-6">
                      <div className="flex items-center justify-between border-b border-gallery-800 pb-3">
                        <h4 className="text-base font-serif font-bold text-accent-violet">
                          {isAddingWorkflow ? '新增 AI 视频生成工作流' : `编辑工作流：${editingWorkflow.title}`}
                        </h4>
                        <button
                          onClick={() => setEditingWorkflow(null)}
                          className="text-xs font-mono text-gallery-400 hover:text-white"
                        >
                          取消
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-gallery-300">工作流标题:</label>
                          <input
                            type="text"
                            value={editingWorkflow.title}
                            onChange={(e) => setEditingWorkflow({ ...editingWorkflow, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-gallery-300">应用场景分类:</label>
                          <input
                            type="text"
                            value={editingWorkflow.category}
                            onChange={(e) => setEditingWorkflow({ ...editingWorkflow, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-mono text-gallery-300">整体流程概述 (一两句话):</label>
                          <textarea
                            rows={2}
                            value={editingWorkflow.summary}
                            onChange={(e) => setEditingWorkflow({ ...editingWorkflow, summary: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-gallery-950 border border-gallery-700 text-xs text-gallery-100"
                          />
                        </div>
                      </div>

                      {/* Dynamic Steps Management */}
                      <div className="pt-4 border-t border-gallery-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-gold-400">
                            🎬 执行步骤依次管理 (目前共 {editingWorkflow.steps.length} 步):
                          </span>
                          <button
                            onClick={handleAddStepToEditingWorkflow}
                            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-accent-violet/20 border border-accent-violet/40 text-accent-violet font-mono text-xs font-bold hover:bg-accent-violet hover:text-white transition-all cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>+ 依次添加下一步骤 (Add Step)</span>
                          </button>
                        </div>

                        <div className="space-y-4">
                          {editingWorkflow.steps.map((step, sIdx) => (
                            <div key={sIdx} className="p-4 rounded-xl bg-gallery-950 border border-gallery-800 space-y-3 relative">
                              <div className="flex items-center justify-between border-b border-gallery-800/80 pb-2">
                                <span className="font-mono text-xs font-bold text-gold-400">
                                  步骤 {step.stepNumber}：
                                </span>
                                <button
                                  onClick={() => handleDeleteStep(sIdx)}
                                  className="text-xs text-accent-crimson hover:underline cursor-pointer"
                                >
                                  删除此步骤
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[11px] font-mono text-gallery-400">步骤名称 (如：第一步生成资产):</label>
                                  <input
                                    type="text"
                                    value={step.stepTitle}
                                    onChange={(e) => {
                                      const updated = [...editingWorkflow.steps];
                                      updated[sIdx].stepTitle = e.target.value;
                                      setEditingWorkflow({ ...editingWorkflow, steps: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded bg-gallery-900 border border-gallery-700 text-xs text-gallery-100"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[11px] font-mono text-gallery-400">使用工具 (如：Runway Gen-3):</label>
                                  <input
                                    type="text"
                                    value={step.toolUsed}
                                    onChange={(e) => {
                                      const updated = [...editingWorkflow.steps];
                                      updated[sIdx].toolUsed = e.target.value;
                                      setEditingWorkflow({ ...editingWorkflow, steps: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded bg-gallery-900 border border-gallery-700 text-xs text-gallery-100"
                                  />
                                </div>

                                <div className="space-y-1 sm:col-span-2">
                                  <label className="text-[11px] font-mono text-gallery-400">该步骤执行目的:</label>
                                  <input
                                    type="text"
                                    value={step.purpose}
                                    onChange={(e) => {
                                      const updated = [...editingWorkflow.steps];
                                      updated[sIdx].purpose = e.target.value;
                                      setEditingWorkflow({ ...editingWorkflow, steps: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded bg-gallery-900 border border-gallery-700 text-xs text-gallery-100"
                                  />
                                </div>

                                <div className="space-y-1 sm:col-span-2">
                                  <label className="text-[11px] font-mono text-gallery-400">该步骤提示词 / 关键命令:</label>
                                  <textarea
                                    rows={2}
                                    value={step.stepPrompt}
                                    onChange={(e) => {
                                      const updated = [...editingWorkflow.steps];
                                      updated[sIdx].stepPrompt = e.target.value;
                                      setEditingWorkflow({ ...editingWorkflow, steps: updated });
                                    }}
                                    className="w-full px-3 py-1.5 rounded bg-gallery-900 border border-gallery-700 text-xs text-gallery-100 font-mono"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3">
                        <button
                          onClick={() => setEditingWorkflow(null)}
                          className="px-4 py-2 rounded-xl bg-gallery-800 text-gallery-300 text-xs font-serif"
                        >
                          取消
                        </button>
                        <button
                          onClick={handleSaveWorkflow}
                          className="px-5 py-2 rounded-xl bg-gold-500 text-gallery-950 font-serif font-bold text-xs shadow-glow-gold hover:bg-gold-400 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>保存工作流管线</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-gallery-400">已录入视频工作流 ({videoWorkflows.length})</span>
                        <button
                          onClick={handleStartAddWorkflow}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-500 text-gallery-950 font-serif font-bold text-xs shadow-glow-gold cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ 新增视频工作流</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {videoWorkflows.map((wf) => (
                          <div key={wf.id} className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 flex items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-serif font-bold text-gallery-100">{wf.title}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gallery-950 border border-gallery-700 text-accent-violet">{wf.category}</span>
                              </div>
                              <p className="text-xs text-gallery-400 line-clamp-1 mt-1">{wf.summary}</p>
                              <div className="text-[11px] font-mono text-gold-400 mt-1">包含 {wf.steps.length} 个执行步骤</div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  playSpotlightClick();
                                  setEditingWorkflow({ ...wf });
                                  setIsAddingWorkflow(false);
                                }}
                                className="p-2 rounded-lg bg-gallery-800 text-gallery-300 hover:text-gold-300 hover:border-gold-500 border border-gallery-700 cursor-pointer"
                                title="编辑"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteWorkflow(wf.id)}
                                className="p-2 rounded-lg bg-gallery-800 text-gallery-300 hover:text-accent-crimson hover:border-accent-crimson border border-gallery-700 cursor-pointer"
                                title="删除"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: BACKUP AND RESET */}
              {activeTab === 'backup' && (
                <div className="space-y-6 max-w-xl">
                  <div className="p-5 rounded-2xl bg-gallery-900 border border-gallery-800 space-y-3">
                    <h4 className="text-sm font-serif font-bold text-gallery-100 flex items-center gap-2">
                      <Download className="w-4 h-4 text-gold-400" />
                      <span>导出全部案例与工作流配置文件 (JSON)</span>
                    </h4>
                    <p className="text-xs text-gallery-400 leading-relaxed font-sans">
                      一键下载本地录入的所有图片案例与视频工作流数据备份，方便跨设备迁移或提交至代码仓库。
                    </p>
                    <button
                      onClick={handleExportJSON}
                      className="px-4 py-2 rounded-xl bg-gold-500 text-gallery-950 font-serif font-bold text-xs shadow-glow-gold hover:bg-gold-400 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>一键下载备份 JSON 文件</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-gallery-900 border border-gallery-800 space-y-3">
                    <h4 className="text-sm font-serif font-bold text-accent-crimson flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-accent-crimson" />
                      <span>恢复官方默认案例预设</span>
                    </h4>
                    <p className="text-xs text-gallery-400 leading-relaxed font-sans">
                      清空本地自定义修改，重新加载初始内置的高质量 VOX、锈湖、包豪斯等图片与视频工作流。
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 rounded-xl bg-accent-crimson/20 border border-accent-crimson/50 text-accent-crimson hover:bg-accent-crimson hover:text-white font-serif font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>清空并恢复出厂预设</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};