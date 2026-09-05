import React, { useState } from 'react';
import type { CinemaScene } from '../types/cinema';
import type { VisualAtom, DesignPrinciple, StyleRuleEquation } from '../types/atlas';
import { 
  X, Plus, Trash2, Edit3, Save, RotateCcw, Download, Upload, 
  Film, Atom, Scale, Compass, Check, AlertTriangle, Database
} from 'lucide-react';
import { 
  saveCinemaScenes, saveVisualAtoms, saveDesignPrinciples, saveStyleRules,
  exportAllAtlasDataAsJSON, importAtlasDataFromJSON, resetAtlasToDefaults
} from '../data/atlasStore';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  cinemaScenes: CinemaScene[];
  visualAtoms: VisualAtom[];
  designPrinciples: DesignPrinciple[];
  styleRules: StyleRuleEquation[];
  onUpdateCinemaScenes: (scenes: CinemaScene[]) => void;
  onUpdateVisualAtoms: (atoms: VisualAtom[]) => void;
  onUpdateDesignPrinciples: (principles: DesignPrinciple[]) => void;
  onUpdateStyleRules: (styles: StyleRuleEquation[]) => void;
}

type CMSTab = 'scenes' | 'atoms' | 'principles' | 'styles' | 'backup';

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  cinemaScenes,
  visualAtoms,
  designPrinciples,
  styleRules,
  onUpdateCinemaScenes,
  onUpdateVisualAtoms,
  onUpdateDesignPrinciples,
  onUpdateStyleRules,
}) => {
  const [activeTab, setActiveTab] = useState<CMSTab>('scenes');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Edit states for Scene
  const [editingScene, setEditingScene] = useState<CinemaScene | null>(null);
  const [isAddingScene, setIsAddingScene] = useState(false);

  // Edit states for Atom
  const [editingAtom, setEditingAtom] = useState<VisualAtom | null>(null);
  const [isAddingAtom, setIsAddingAtom] = useState(false);

  // Edit states for Principle
  const [editingPrinciple, setEditingPrinciple] = useState<DesignPrinciple | null>(null);

  // Backup JSON String for manual pasting
  const [importJsonInput, setImportJsonInput] = useState('');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    playSuccessChime();
    setTimeout(() => setToastMsg(null), 2500);
  };

  // --- Scene Operations ---
  const handleSaveScene = () => {
    if (!editingScene) return;
    let updated: CinemaScene[];
    if (isAddingScene) {
      updated = [editingScene, ...cinemaScenes];
    } else {
      updated = cinemaScenes.map((s) => (s.id === editingScene.id ? editingScene : s));
    }
    onUpdateCinemaScenes(updated);
    saveCinemaScenes(updated);
    setEditingScene(null);
    setIsAddingScene(false);
    showToast('电影分镜已成功保存并同步！');
  };

  const handleDeleteScene = (id: string) => {
    if (confirm('确定要删除此电影分镜镜头吗？')) {
      const updated = cinemaScenes.filter((s) => s.id !== id);
      onUpdateCinemaScenes(updated);
      saveCinemaScenes(updated);
      showToast('分镜已删除');
    }
  };

  // --- Atom Operations ---
  const handleSaveAtom = () => {
    if (!editingAtom) return;
    let updated: VisualAtom[];
    if (isAddingAtom) {
      updated = [editingAtom, ...visualAtoms];
    } else {
      updated = visualAtoms.map((a) => (a.id === editingAtom.id ? editingAtom : a));
    }
    onUpdateVisualAtoms(updated);
    saveVisualAtoms(updated);
    setEditingAtom(null);
    setIsAddingAtom(false);
    showToast('视觉原子已成功更新！');
  };

  const handleDeleteAtom = (id: string) => {
    if (confirm('确定要删除此视觉原子吗？')) {
      const updated = visualAtoms.filter((a) => a.id !== id);
      onUpdateVisualAtoms(updated);
      saveVisualAtoms(updated);
      showToast('视觉原子已删除');
    }
  };

  // --- Backup Operations ---
  const handleExport = () => {
    const jsonStr = exportAllAtlasDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `art_atlas_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('全站数据包已成功导出为 JSON 文件！');
  };

  const handleImport = () => {
    if (!importJsonInput.trim()) return;
    const ok = importAtlasDataFromJSON(importJsonInput);
    if (ok) {
      window.location.reload();
    } else {
      alert('JSON 格式错误，请检查输入！');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('警告：此操作将清除所有本地修改并恢复官方默认数据，确定继续吗？')) {
      resetAtlasToDefaults();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border shadow-2xl transition-all"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-main)',
        }}
      >
        {/* Toast Notification */}
        {toastMsg && (
          <div className="absolute top-4 right-16 z-50 px-4 py-2 rounded-xl bg-emerald-600 text-white font-mono text-xs shadow-xl flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">策展管理后台 (Curator CMS)</h2>
              <p className="text-xs font-mono opacity-60">持续运维与内容扩充控制中心 · 支持随时增补与导出</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl transition-colors hover:bg-white/10 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b bg-black/20 text-xs overflow-x-auto" style={{ borderColor: 'var(--border-subtle)' }}>
          {[
            { id: 'scenes', label: '🎬 电影分镜 (Scenes)', count: cinemaScenes.length },
            { id: 'atoms', label: '⚛️ 视觉原子 (Atoms)', count: visualAtoms.length },
            { id: 'principles', label: '⚖️ 设计原则 (Principles)', count: designPrinciples.length },
            { id: 'styles', label: '🏛️ 风格规则 (Styles)', count: styleRules.length },
            { id: 'backup', label: '💾 备份与同步 (Backup)', count: 'JSON' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSpotlightClick();
                setActiveTab(tab.id as CMSTab);
                setEditingScene(null);
                setEditingAtom(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100 hover:bg-white/5'
              }`}
            >
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono opacity-80">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* ================= TAB 1: CINEMA SCENES ================= */}
          {activeTab === 'scenes' && (
            <div>
              {/* If editing / adding scene */}
              {editingScene ? (
                <div className="space-y-4 max-w-3xl mx-auto bg-black/30 p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="font-bold text-sm text-indigo-400">
                      {isAddingScene ? '✨ 添加全新电影分镜镜头' : '✏️ 编辑电影分镜档案'}
                    </h3>
                    <button
                      onClick={() => {
                        setEditingScene(null);
                        setIsAddingScene(false);
                      }}
                      className="text-xs opacity-60 hover:opacity-100"
                    >
                      取消返回
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block opacity-60 mb-1">分镜编号 (e.g. SCENE 05)</label>
                      <input
                        type="text"
                        value={editingScene.sceneNumber}
                        onChange={(e) => setEditingScene({ ...editingScene, sceneNumber: e.target.value })}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 focus:border-indigo-400"
                      />
                    </div>
                    <div>
                      <label className="block opacity-60 mb-1">分镜幕次 (Act Headline)</label>
                      <input
                        type="text"
                        value={editingScene.act}
                        onChange={(e) => setEditingScene({ ...editingScene, act: e.target.value })}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block opacity-60 mb-1">镜头标题 (中文)</label>
                      <input
                        type="text"
                        value={editingScene.title}
                        onChange={(e) => setEditingScene({ ...editingScene, title: e.target.value })}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 focus:border-indigo-400"
                      />
                    </div>
                    <div>
                      <label className="block opacity-60 mb-1">Title (English)</label>
                      <input
                        type="text"
                        value={editingScene.titleEn}
                        onChange={(e) => setEditingScene({ ...editingScene, titleEn: e.target.value })}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10 focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block opacity-60 mb-1">封面图片绝对 URL (Unsplash 或直链)</label>
                    <input
                      type="text"
                      value={editingScene.coverImage}
                      onChange={(e) => setEditingScene({ ...editingScene, coverImage: e.target.value })}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10 focus:border-indigo-400 font-mono"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="block text-amber-300 font-bold mb-1">
                      剧本式 Prompt 档案 (电影剧本排版格式，非普通代码框)
                    </label>
                    <textarea
                      rows={6}
                      value={editingScene.scriptPrompt}
                      onChange={(e) => setEditingScene({ ...editingScene, scriptPrompt: e.target.value })}
                      className="w-full p-3 rounded-xl bg-black/70 border border-white/15 focus:border-amber-400 font-mono text-xs leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block opacity-60 mb-1">摄影机镜头 (Lens)</label>
                      <input
                        type="text"
                        value={editingScene.cameraRig.lens}
                        onChange={(e) => setEditingScene({
                          ...editingScene,
                          cameraRig: { ...editingScene.cameraRig, lens: e.target.value }
                        })}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block opacity-60 mb-1">快门与开角 (Shutter)</label>
                      <input
                        type="text"
                        value={editingScene.cameraRig.shutter}
                        onChange={(e) => setEditingScene({
                          ...editingScene,
                          cameraRig: { ...editingScene.cameraRig, shutter: e.target.value }
                        })}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingScene(null)}
                      className="px-4 py-2 rounded-xl text-xs bg-white/5 hover:bg-white/10"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleSaveScene}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>保存并生效</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono opacity-60">当前已收录 {cinemaScenes.length} 个电影分镜</span>
                    <button
                      onClick={() => {
                        const newScene: CinemaScene = {
                          id: `scene-custom-${Date.now()}`,
                          sceneNumber: `SCENE 0${cinemaScenes.length + 1}`,
                          act: 'ACT · 新增分镜 (ATMOSPHERE)',
                          title: '新电影分镜标题',
                          titleEn: 'New Cinematic Scene',
                          locationAndTime: 'LOCATION · 00:00 · WEATHER',
                          scriptPrompt: `[SCENE START]\nEXT. CINEMATIC LOCATION - NIGHT\nDescribe the visual elements, camera movement and lighting...\n[CAMERA: 35MM T/1.8 --ar 16:9 --v 6.1]`,
                          cameraRig: {
                            lens: '35mm Cine Prime T/1.8',
                            shutter: '1/48 sec (180° Shutter Angle)',
                            lighting: 'Low-Key Volumetric Lighting',
                            mood: 'Cinematic Atmosphere',
                            movement: 'Slow Dolly Forward',
                          },
                          coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
                          colorPalette: ['#0f172a', '#38bdf8', '#c084fc', '#ffffff'],
                          accentColor: '#38bdf8',
                          durationSeconds: 24,
                          behindTheScenes: {
                            atomName: '冷暖对撞',
                            principleName: '对比 (Contrast)',
                            styleName: '赛博朋克与暗调未来',
                            whyItWorks: '描述该分镜背后的设计学原理与为什么好看...',
                          },
                        };
                        setEditingScene(newScene);
                        setIsAddingScene(true);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>新增电影分镜</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cinemaScenes.map((sc) => (
                      <div
                        key={sc.id}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={sc.coverImage}
                            alt={sc.title}
                            className="w-16 h-16 rounded-lg object-cover shrink-0"
                          />
                          <div className="overflow-hidden">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 font-bold" style={{ color: sc.accentColor }}>
                              {sc.sceneNumber}
                            </span>
                            <h4 className="font-bold text-sm truncate mt-1">{sc.title}</h4>
                            <p className="text-[11px] font-mono opacity-50 truncate">{sc.titleEn}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingScene({ ...sc });
                              setIsAddingScene(false);
                            }}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                            title="编辑"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteScene(sc.id)}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white"
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

          {/* ================= TAB 2: VISUAL ATOMS ================= */}
          {activeTab === 'atoms' && (
            <div>
              {editingAtom ? (
                <div className="space-y-4 max-w-3xl mx-auto bg-black/30 p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="font-bold text-sm text-indigo-400">
                      {isAddingAtom ? '✨ 新增视觉原子' : '✏️ 编辑视觉原子'}
                    </h3>
                    <button onClick={() => setEditingAtom(null)} className="text-xs opacity-60">取消</button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block opacity-60 mb-1">原子名称</label>
                      <input
                        type="text"
                        value={editingAtom.name}
                        onChange={(e) => setEditingAtom({ ...editingAtom, name: e.target.value })}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block opacity-60 mb-1">Name (English)</label>
                      <input
                        type="text"
                        value={editingAtom.nameEn}
                        onChange={(e) => setEditingAtom({ ...editingAtom, nameEn: e.target.value })}
                        className="w-full p-2 rounded-lg bg-black/60 border border-white/10"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block opacity-60 mb-1">视觉材料公式 (Formula)</label>
                    <input
                      type="text"
                      value={editingAtom.formula}
                      onChange={(e) => setEditingAtom({ ...editingAtom, formula: e.target.value })}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10 font-mono"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="block opacity-60 mb-1">视知觉原理 (Why It Works)</label>
                    <textarea
                      rows={3}
                      value={editingAtom.principle}
                      onChange={(e) => setEditingAtom({ ...editingAtom, principle: e.target.value })}
                      className="w-full p-2 rounded-lg bg-black/60 border border-white/10"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button onClick={() => setEditingAtom(null)} className="px-4 py-2 rounded-xl text-xs bg-white/5">取消</button>
                    <button onClick={handleSaveAtom} className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white">保存</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono opacity-60">当前共 {visualAtoms.length} 个视觉原子</span>
                    <button
                      onClick={() => {
                        const newAtom: VisualAtom = {
                          id: `atom-custom-${Date.now()}`,
                          name: '新视觉原子',
                          nameEn: 'New Visual Atom',
                          dimension: 'composition',
                          formula: 'A 元素 + B 元素 = 核心视觉焦点',
                          description: '原子简要描述...',
                          principle: '视知觉原理剖析...',
                          sampleVisualUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
                          accentColor: '#6366f1',
                          tags: ['新原子', '设计技法'],
                        };
                        setEditingAtom(newAtom);
                        setIsAddingAtom(true);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>新增视觉原子</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {visualAtoms.map((atom) => (
                      <div key={atom.id} className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase" style={{ backgroundColor: atom.accentColor, color: '#fff' }}>
                            {atom.dimension}
                          </span>
                          <h4 className="font-bold text-sm mt-1">{atom.name} ({atom.nameEn})</h4>
                          <p className="text-xs opacity-70 truncate max-w-sm">{atom.formula}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingAtom({ ...atom }); setIsAddingAtom(false); }} className="p-1.5 rounded bg-white/10 hover:bg-white/20">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteAtom(atom.id)} className="p-1.5 rounded bg-red-500/20 text-red-300">
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

          {/* ================= TAB 3: DESIGN PRINCIPLES ================= */}
          {activeTab === 'principles' && (
            <div className="space-y-4">
              <div className="text-xs font-mono opacity-60">十大设计原则列表（系统核心基石）</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {designPrinciples.map((pr) => (
                  <div key={pr.id} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-emerald-400">{pr.name} ({pr.nameEn})</span>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pr.accentColor }} />
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed font-sans">{pr.definition}</p>
                    <div className="text-[11px] p-2 rounded bg-black/40 border border-white/5 opacity-75 font-mono">
                      “{pr.coreQuestion}”
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: STYLE EQUATIONS ================= */}
          {activeTab === 'styles' && (
            <div className="space-y-4">
              <div className="text-xs font-mono opacity-60">风格规则方程图谱（风格是一组规则组合）</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {styleRules.map((st) => (
                  <div key={st.id} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-indigo-300">{st.name}</h4>
                      <div className="flex -space-x-1">
                        {st.colorPalette.map((c, i) => (
                          <div key={i} className="w-3 h-3 rounded-full border border-black" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                      {st.equation.map((eq, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-white/10">+ {eq}</span>
                      ))}
                    </div>
                    <p className="text-xs opacity-75 leading-relaxed">{st.aestheticMood}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: BACKUP & SYNC ================= */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2 text-indigo-400">
                  <Download className="w-4 h-4" />
                  <span>导出全站知识库 JSON 数据包</span>
                </h4>
                <p className="text-xs opacity-75 leading-relaxed">
                  将当前浏览器中新增与修改的电影分镜、视觉原子、设计原则与作品打包下载为标准 JSON 文件，可用于永久归档或在其它设备恢复。
                </p>
                <button
                  onClick={handleExport}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>立即导出并下载 JSON 文件</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2 text-emerald-400">
                  <Upload className="w-4 h-4" />
                  <span>导入数据包 (恢复 / 同步)</span>
                </h4>
                <p className="text-xs opacity-75 leading-relaxed">
                  在此粘贴先前导出的 JSON 代码，一键覆盖同步至当前浏览器：
                </p>
                <textarea
                  rows={4}
                  value={importJsonInput}
                  onChange={(e) => setImportJsonInput(e.target.value)}
                  placeholder="在此粘贴导出的 JSON 字符串..."
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs"
                />
                <button
                  onClick={handleImport}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  解析并应用此数据包
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-2">
                <h4 className="font-bold text-xs flex items-center gap-1.5 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>出厂默认重置</span>
                </h4>
                <p className="text-[11px] opacity-70">若需要清除所有个人配置并恢复官方默认初始内容：</p>
                <button
                  onClick={handleResetDefaults}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-red-300 hover:bg-red-500/20 border border-red-500/30 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>重置出厂默认数据</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
