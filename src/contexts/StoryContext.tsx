import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { readTextFile, writeTextFile, exists } from '@tauri-apps/plugin-fs';

// 型定義をインポート（後で調整）
interface DeploymentInfo {
  chapterId: string;
  lastFileName: string;
}

interface Scene {
  id: string;
  sceneNo: number;
  title: string;
  chapter: string;
  chapterId?: string;
  characters: string;
  characterIds?: string[];
  time: string;
  timeMode?: 'text' | 'datetime';
  place: string;
  aim: string;
  summary: string;
  note: string;
  deploymentInfo?: DeploymentInfo;
}

interface Chapter {
  id: string;
  title: string;
  deploymentNumber?: number;
}

interface StoryContextType {
  scenes: Scene[];
  chapters: Chapter[];
  lastDeployPath: string | null;
  getSceneById: (id: string) => Scene | undefined;
  getSceneFilePath: (sceneId: string) => string | null;
  updateSceneContent: (sceneId: string, content: string) => Promise<void>;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lastDeployPath, setLastDeployPath] = useState<string | null>(null);

  const getSceneById = (id: string) => {
    return scenes.find(s => s.id === id);
  };

  const getSceneFilePath = (sceneId: string): string | null => {
    const scene = getSceneById(sceneId);
    if (!scene || !scene.deploymentInfo || !lastDeployPath) {
      return null;
    }

    const chapter = chapters.find(c => c.id === scene.deploymentInfo!.chapterId);
    if (!chapter || chapter.deploymentNumber === undefined) {
      return null;
    }

    const chapterFolder = `${String(chapter.deploymentNumber).padStart(2, '0')}_${chapter.title}`;
    const fileName = scene.deploymentInfo.lastFileName;
    
    return `${lastDeployPath}/${chapterFolder}/${fileName}`;
  };

  const updateSceneContent = async (sceneId: string, content: string) => {
    const filePath = getSceneFilePath(sceneId);
    if (!filePath) {
      throw new Error('ファイルパスが見つかりません');
    }
    await writeTextFile(filePath, content);
  };

  return (
    <StoryContext.Provider value={{
      scenes,
      chapters,
      lastDeployPath,
      getSceneById,
      getSceneFilePath,
      updateSceneContent
    }}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStory() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within StoryProvider');
  }
  return context;
}
