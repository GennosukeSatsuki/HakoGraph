import { useTranslation } from 'react-i18next';
import { AppSettings } from '../../utils/exportUtils';

interface SettingsModalProps {
  isOpen: boolean;
  settings: AppSettings;
  systemFonts: string[];
  activeTab: 'general' | 'outline' | 'editor';
  onClose: () => void;
  onSettingsChange: (settings: AppSettings) => void;
  onTabChange: (tab: 'general' | 'outline' | 'editor') => void;
}

export function SettingsModal({
  isOpen,
  settings,
  systemFonts,
  activeTab,
  onClose,
  onSettingsChange,
  onTabChange,
}: SettingsModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '500px', padding: '0' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ padding: '1.5rem 1.5rem 1rem' }}>
          <h2>{t('modals.settings.title')}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', padding: '0 1.5rem' }}>
          <button
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderBottom: activeTab === 'general' ? '2px solid var(--primary)' : '2px solid transparent',
              background: 'none',
              color: activeTab === 'general' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'general' ? 'bold' : 'normal',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
            onClick={() => onTabChange('general')}
          >
            {t('settings.tabs.general')}
          </button>
          <button
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderBottom: activeTab === 'outline' ? '2px solid var(--primary)' : '2px solid transparent',
              background: 'none',
              color: activeTab === 'outline' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'outline' ? 'bold' : 'normal',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
            onClick={() => onTabChange('outline')}
          >
            {t('settings.tabs.outline')}
          </button>
          <button
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderBottom: activeTab === 'editor' ? '2px solid var(--primary)' : '2px solid transparent',
              background: 'none',
              color: activeTab === 'editor' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'editor' ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
            onClick={() => onTabChange('editor')}
          >
            {t('settings.tabs.editor')}
          </button>
        </div>

        <div className="edit-form" style={{ padding: '1.5rem' }}>
          {activeTab === 'general' && (
            <div className="settings-section">
              <div className="form-group">
                <label>{t('settings.language')}</label>
                <select 
                  value={settings.language || 'ja'}
                  onChange={(e) => {
                    const lang = e.target.value as 'en' | 'ja';
                    onSettingsChange({ 
                      ...settings, 
                      language: lang,
                      verticalWriting: lang === 'en' ? false : settings.verticalWriting
                    });
                  }}
                  style={{ 
                    backgroundColor: 'var(--bg-input)', 
                    color: 'var(--text-main)', 
                    border: '1px solid var(--border-subtle)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    width: '100%'
                  }}
                >
                  <option value="ja">日本語 (Japanese)</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t('settings.theme.label')}</label>
                <select 
                  value={settings.theme}
                  onChange={(e) => onSettingsChange({ ...settings, theme: e.target.value as 'system' | 'light' | 'dark' })}
                  style={{ 
                    backgroundColor: 'var(--bg-input)', 
                    color: 'var(--text-main)', 
                    border: '1px solid var(--border-subtle)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    width: '100%'
                  }}
                >
                  <option value="system">{t('settings.theme.system')}</option>
                  <option value="light">{t('settings.theme.light')}</option>
                  <option value="dark">{t('settings.theme.dark')}</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ margin: 0 }}>{t('settings.autoSave.label')}</label>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.autoSave}
                      onChange={(e) => onSettingsChange({ ...settings, autoSave: e.target.checked })}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
                  {t('settings.autoSave.description')}
                </small>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ margin: 0 }}>{t('settings.textureBackground.label')}</label>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.useTextureBackground}
                      onChange={(e) => onSettingsChange({ ...settings, useTextureBackground: e.target.checked })}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
                  {t('settings.textureBackground.description')}
                </small>
              </div>
            </div>
          )}

          {activeTab === 'outline' && (
            <>
              <div className="form-group">
                <label>{t('settings.timeInput.label')}</label>
                <select 
                  value={settings.timeInputMode}
                  onChange={(e) => onSettingsChange({ ...settings, timeInputMode: e.target.value as 'text' | 'datetime' })}
                  style={{ 
                    backgroundColor: 'var(--bg-input)', 
                    color: 'var(--text-main)', 
                    border: '1px solid var(--border-subtle)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    width: '100%'
                  }}
                >
                  <option value="text">{t('settings.timeInput.text')}</option>
                  <option value="datetime">{t('settings.timeInput.datetime')}</option>
                </select>
                <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
                  {t('settings.timeInput.description')}
                </small>
              </div>
              <div className="form-group">
                <label>{t('settings.placeInput.label')}</label>
                <select 
                  value={settings.placeInputMode}
                  onChange={(e) => onSettingsChange({ ...settings, placeInputMode: e.target.value as 'text' | 'select' })}
                  style={{ 
                    backgroundColor: 'var(--bg-input)', 
                    color: 'var(--text-main)', 
                    border: '1px solid var(--border-subtle)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    width: '100%'
                  }}
                >
                  <option value="text">{t('settings.placeInput.text')}</option>
                  <option value="select">{t('settings.placeInput.select')}</option>
                </select>
                <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
                  {t('settings.placeInput.description')}
                </small>
              </div>
            </>
          )}

          {activeTab === 'editor' && (
            <>
              <div className="form-group">
                <label>{t('settings.editor.font')}</label>
                <select 
                  value={settings.editorFontFamily || 'sans-serif'}
                  onChange={(e) => onSettingsChange({ ...settings, editorFontFamily: e.target.value })}
                  style={{ 
                    backgroundColor: 'var(--bg-input)', 
                    color: 'var(--text-main)', 
                    border: '1px solid var(--border-subtle)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    width: '100%'
                  }}
                >
                  <option value="sans-serif">{t('settings.editor.gothic')}</option>
                  <option value="serif">{t('settings.editor.mincho')}</option>
                  <option value='"Yu Mincho", "YuMincho", "Hiragino Mincho ProN", "Hiragino Mincho Pro", "MS PMincho", "MS Mincho", serif'>游明朝 ({t('settings.editor.verticalWriting')})</option>
                  <option value="monospace">{t('settings.editor.monospace')}</option>
                  {systemFonts.length > 0 && (
                    <>
                      <option disabled>──────────</option>
                      {systemFonts.map(font => (
                        <option key={font} value={`"${font}"`}>{font}</option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label>{t('settings.editor.fontSize')}</label>
                <input 
                  type="number" 
                  min="10" 
                  max="72"
                  value={settings.editorFontSize || 16}
                  onChange={(e) => onSettingsChange({ ...settings, editorFontSize: parseInt(e.target.value) || 16 })}
                  style={{ 
                    backgroundColor: 'var(--bg-input)', 
                    color: 'var(--text-main)', 
                    border: '1px solid var(--border-subtle)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    width: '100%'
                  }}
                />
              </div>
              {settings.language !== 'en' && (
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ margin: 0 }}>{t('settings.editor.verticalWriting')}</label>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox"
                        checked={settings.verticalWriting || false}
                        onChange={(e) => onSettingsChange({ ...settings, verticalWriting: e.target.checked })}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
                    {t('settings.editor.verticalWritingDesc')}
                  </small>
                </div>
              )}
            </>
          )}
        </div>
        <div className="modal-footer" style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <button className="primary-btn" onClick={onClose}>{t('common.close')}</button>
        </div>
      </div>
    </div>
  );
}

interface AboutModalProps {
  isOpen: boolean;
  appVersion: string;
  onClose: () => void;
}

export function AboutModal({ isOpen, appVersion, onClose }: AboutModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ justifyContent: 'center', borderBottom: 'none', paddingBottom: 0 }}>
          {/* Logo placeholder or Icon could go here */}
        </div>
        <div style={{ padding: '2rem 1rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>HakoGraph</h2>
          <p style={{ color: 'var(--text-sub)', marginBottom: '1.5rem' }}>Version {appVersion}</p>
          
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            {t('modals.about.description').split('\n').map((line, i) => (
              <span key={i}>{line}<br/></span>
            ))}
          </p>
          
          <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
            &copy; 2025 Gennosuke Satsuki
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="primary" onClick={onClose} style={{ minWidth: '120px' }}>{t('common.close')}</button>
        </div>
      </div>
    </div>
  );
}
