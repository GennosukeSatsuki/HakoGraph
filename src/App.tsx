import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import SceneListPage from './pages/SceneListPage';
import EditorPage from './pages/EditorPage';
import { exportProject } from './utils/exportUtils';
import { useStoryStore } from './stores/useStoryStore';

export default function App() {
  useEffect(() => {
    const appWindow = getCurrentWindow();
    let unlistenFn: (() => void) | null = null;

    const setupCloseHandler = async () => {
      unlistenFn = await appWindow.onCloseRequested(async (event) => {
        event.preventDefault();

        try {
          // get current state snapshot from store
          const currentStoreState = useStoryStore.getState();
          
          let data = { ...currentStoreState };
          
          // 1. 書き出し（自動追跡保存）
          if (data.lastDeployPath) {
            const { scenes, chapters } = await exportProject(data as any, data.lastDeployPath);
            // 書き出し結果（deploymentInfoなど）を反映
            const updatedData = { ...data, scenes, chapters };
            
            // 2. JSONプロジェクトファイルの保存
            if (data.currentFilePath) {
              await writeTextFile(data.currentFilePath, JSON.stringify(updatedData, null, 2));
              console.log('Project JSON saved on close');
            }
            
            // Store のステートを最終更新（persist が localStorage に同期してくれる）
            useStoryStore.setState(updatedData);
          } else if (data.currentFilePath) {
            // 書き出しパスはないがJSONパスはある場合
            await writeTextFile(data.currentFilePath, JSON.stringify(data, null, 2));
          }
        } catch (e) {
          console.error('Auto-save on close failed:', e);
        }

        if (unlistenFn) unlistenFn();
        await appWindow.close();
      });
    };

    setupCloseHandler();

    return () => {
      if (unlistenFn) unlistenFn();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SceneListPage />} />
        <Route path="/editor/:id" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
