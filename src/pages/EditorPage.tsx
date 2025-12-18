import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { exists, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [fileExists, setFileExists] = useState(false);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scene, setScene] = useState<any>(null);

  useEffect(() => {
    loadSceneFile();
  }, [id]);

  const loadSceneFile = async () => {
    try {
      setLoading(true);
      setError(null);

      // ローカルストレージからシーンデータを取得
      const savedData = localStorage.getItem('storyData');
      if (!savedData) {
        setError('プロジェクトデータが見つかりません。箱書き一覧に戻ってファイルを開いてください。');
        setLoading(false);
        return;
      }

      const data = JSON.parse(savedData);
      const sceneData = data.scenes?.find((s: any) => s.id === id);
      
      if (!sceneData) {
        setError('シーンが見つかりません。');
        setLoading(false);
        return;
      }

      // シーン情報を保存
      setScene(sceneData);

      // 書き出しパスとdeploymentInfoをチェック
      if (!data.lastDeployPath || !sceneData.deploymentInfo) {
        setFileExists(false);
        setLoading(false);
        return;
      }

      // ファイルパスを構築
      const chapter = data.chapters?.find((c: any) => c.id === sceneData.deploymentInfo.chapterId);
      if (!chapter || chapter.deploymentNumber === undefined) {
        setFileExists(false);
        setLoading(false);
        return;
      }

      const chapterFolder = `${String(chapter.deploymentNumber).padStart(2, '0')}_${chapter.title}`;
      const fileName = sceneData.deploymentInfo.lastFileName;
      const path = `${data.lastDeployPath}/${chapterFolder}/${fileName}`;
      
      setFilePath(path);

      // ファイルが存在するかチェック
      const fileExistsCheck = await exists(path);
      setFileExists(fileExistsCheck);

      if (fileExistsCheck) {
        // ファイルを読み込む
        const fileContent = await readTextFile(path);
        setContent(fileContent);
      }

      setLoading(false);
    } catch (e) {
      console.error('ファイル読み込みエラー:', e);
      setError(`ファイルの読み込みに失敗しました: ${e}`);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!filePath) {
      alert('ファイルパスが設定されていません');
      return;
    }

    try {
      await writeTextFile(filePath, content);
      alert('保存しました');
    } catch (e) {
      alert(`保存に失敗しました: ${e}`);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        読み込み中...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        padding: '20px'
      }}>
        <div style={{ 
          color: '#d32f2f', 
          fontSize: '18px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          箱書き一覧に戻る
        </button>
      </div>
    );
  }

  if (!fileExists) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        padding: '40px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px' }}>📝 書き出しが必要です</h2>
        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.8',
          marginBottom: '30px',
          maxWidth: '500px',
          color: 'var(--text-sub)'
        }}>
          このシーンはまだ書き出されていません。<br />
          箱書き一覧に戻って、「ファイル」メニューから<br />
          「書き出し...」を実行してください。
        </p>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          箱書き一覧に戻る
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>シーン{scene?.sceneNo} {scene?.title || '(無題)'}</h1>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          箱書き一覧に戻る
        </button>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="ここに本文を書いてください..."
        style={{
          flex: 1,
          padding: '20px',
          fontSize: '16px',
          lineHeight: '1.8',
          border: '1px solid #ccc',
          borderRadius: '4px',
          resize: 'none',
          fontFamily: 'inherit'
        }}
      />
      
      <div style={{ 
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>文字数: {content.length}</div>
        <button 
          onClick={handleSave}
          style={{
            padding: '10px 30px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          保存
        </button>
      </div>
    </div>
  );
}
