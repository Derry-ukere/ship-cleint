/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import logoSvg from '../assets/ship4wd-logo.png';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { getshipment } from '../redux/slices/shipments/getshipment';

// ----------------------------------------------------------------------

const FONT_FAMILY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

const STATUS_COLORS = {
  'On Hold': { bg: '#FFF8E1', text: '#F57F17', border: '#FFE082' },
  'In Transit': { bg: '#E3F2FD', text: '#1565C0', border: '#90CAF9' },
  'Delivered': { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
  'Cancelled': { bg: '#FFEBEE', text: '#C62828', border: '#EF9A9A' },
  'Processing': { bg: '#EDE7F6', text: '#4527A0', border: '#B39DDB' },
};

const STATUS_ICONS = {
  'On Hold': 'pause_circle',
  'In Transit': 'local_shipping',
  'Delivered': 'check_circle',
  'Cancelled': 'cancel',
  'Processing': 'hourglass_top',
};

function formatTimestamp(ts, locale) {
  if (!ts || !ts.seconds) return {};
  const date = new Date(ts.seconds * 1000);
  const localeMap = { en: 'en-US', es: 'es-ES', fr: 'fr-FR', zh: 'zh-CN', pt: 'pt-BR', de: 'de-DE', hi: 'hi-IN' };
  const loc = localeMap[locale] || 'en-US';
  return {
    date: date.toLocaleDateString(loc, { year: 'numeric', month: 'short', day: 'numeric' }),
    time: date.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' }),
  };
}

// ----------------------------------------------------------------------

// Shared styles
const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    border: '1px solid #f0f0f0',
    marginBottom: '20px',
  },
  label: {
    margin: '0 0 6px',
    color: '#64748b',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontFamily: FONT_FAMILY,
  },
  value: {
    margin: 0,
    fontWeight: 600,
    fontSize: '15px',
    color: '#0f172a',
    fontFamily: FONT_FAMILY,
    textTransform: 'capitalize',
  },
  sectionTitle: {
    margin: '0 0 20px',
    fontSize: '16px',
    fontWeight: 700,
    color: '#0f172a',
    fontFamily: FONT_FAMILY,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  bodyText: {
    margin: 0,
    fontSize: '14px',
    color: '#475569',
    lineHeight: 1.7,
    fontFamily: FONT_FAMILY,
  },
};

// ----------------------------------------------------------------------

export default function TrackShipment() {
  const { t, i18n } = useTranslation();
  const { shipment, isLoading, error } = useSelector((state) => state.getShipment || {});
  const dispatch = useDispatch();
  const [trackingNumber, setTrackingNumber] = React.useState('');
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      dispatch(getshipment(trackingNumber.trim()));
    }
  };

  const statusStyle = shipment ? (STATUS_COLORS[shipment.status] || STATUS_COLORS.Processing) : null;
  const statusIcon = shipment ? (STATUS_ICONS[shipment.status] || STATUS_ICONS.Processing) : null;

  return (
    <Page title="Track Shipment">
      {/* Google Material Icons + Inter font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />

      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: FONT_FAMILY }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(160deg, #6e3df7 0%, #5b2ee0 50%, #7c4dff 100%)',
          padding: '48px 24px 90px',
          textAlign: 'center',
          position: 'relative',
        }}>
          {/* Language Selector */}
          <div ref={langRef} style={{ position: 'absolute', top: '20px', right: '24px', zIndex: 10 }}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: FONT_FAMILY,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="material-icons-round" style={{ fontSize: '18px' }}>translate</span>
              <span style={{ fontSize: '16px' }}>{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <span className="material-icons-round" style={{ fontSize: '16px', transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                expand_more
              </span>
            </button>

            {langOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                minWidth: '180px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{ padding: '8px 14px', borderBottom: '1px solid #f1f5f9' }}>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: FONT_FAMILY }}>
                    {t('language')}
                  </p>
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageChange(lang.code)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 14px',
                      border: 'none',
                      backgroundColor: lang.code === currentLang.code ? '#f1f5f9' : 'transparent',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: lang.code === currentLang.code ? 600 : 400,
                      color: '#0f172a',
                      fontFamily: FONT_FAMILY,
                      textAlign: 'left',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={(e) => { if (lang.code !== currentLang.code) e.target.style.backgroundColor = '#f8fafc'; }}
                    onMouseLeave={(e) => { if (lang.code !== currentLang.code) e.target.style.backgroundColor = 'transparent'; }}
                  >
                    <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                    <span>{lang.label}</span>
                    {lang.code === currentLang.code && (
                      <span className="material-icons-round" style={{ fontSize: '16px', color: '#3b82f6', marginLeft: 'auto' }}>check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="/" style={{ display: 'inline-block' }}>
            <img src={logoSvg} alt="Ship4wd" style={{ height: '44px', marginBottom: '32px', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          </a>
          <h1 style={{
            color: '#fff',
            fontSize: '32px',
            fontWeight: 800,
            margin: '0 0 10px',
            fontFamily: FONT_FAMILY,
            letterSpacing: '-0.02em',
          }}>
            {t('header.title')}
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '16px',
            fontWeight: 400,
            margin: 0,
            fontFamily: FONT_FAMILY,
          }}>
            {t('header.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '620px', margin: '-48px auto 0', padding: '0 20px', position: 'relative', zIndex: 1 }}>
          <form onSubmit={handleSearch}>
            <div style={{
              display: 'flex',
              backgroundColor: '#fff',
              borderRadius: '14px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '20px 24px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  fontFamily: FONT_FAMILY,
                  color: '#0f172a',
                  backgroundColor: 'transparent',
                  letterSpacing: '0.01em',
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !trackingNumber.trim()}
                style={{
                  padding: '20px 36px',
                  backgroundColor: (isLoading || !trackingNumber.trim()) ? '#94a3b8' : '#6e3df7',
                  color: '#fff',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: FONT_FAMILY,
                  cursor: (isLoading || !trackingNumber.trim()) ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.01em',
                }}
              >
                {isLoading ? t('search.searching') : t('search.button')}
              </button>
            </div>
          </form>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '32px 20px 80px' }}>

          {/* Loading */}
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <CircularProgress size={40} thickness={4} style={{ color: '#6e3df7' }} />
              <p style={{ marginTop: '20px', color: '#64748b', fontSize: '15px', fontWeight: 500, fontFamily: FONT_FAMILY }}>
                {t('loading')}
              </p>
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div style={{
              ...styles.card,
              textAlign: 'center',
              padding: '48px 28px',
            }}>
              <span className="material-icons-round" style={{ fontSize: '56px', color: '#e2e8f0', marginBottom: '16px', display: 'block' }}>
                inventory_2
              </span>
              <h3 style={{ margin: '0 0 8px', color: '#0f172a', fontSize: '18px', fontWeight: 700, fontFamily: FONT_FAMILY }}>
                {t('error.title')}
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px', fontFamily: FONT_FAMILY, lineHeight: 1.6 }}>
                {error}. {t('error.message')}
              </p>
            </div>
          )}

          {/* Shipment Results */}
          {shipment && !isLoading && !error && (
            <>
              {/* Status Header */}
              <div style={{
                ...styles.card,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
              }}>
                <div>
                  <p style={styles.label}>{t('shipment.trackingNumber')}</p>
                  <h2 style={{
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#0f172a',
                    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",
                    letterSpacing: '0.03em',
                  }}>
                    {shipment.trackingNumber}
                  </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  {shipment.estimatedPickupDate && (
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ ...styles.label, fontSize: '11px' }}>{t('shipment.estPickup')}</p>
                      <p style={{ ...styles.value, fontSize: '14px' }}>{shipment.estimatedPickupDate}</p>
                    </div>
                  )}
                  <div style={{
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                    border: `1px solid ${statusStyle.border}`,
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '14px',
                    fontFamily: FONT_FAMILY,
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>{statusIcon}</span>
                    {t(`status.${shipment.status}`)}
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '14px',
                marginBottom: '20px',
              }}>
                {[
                  { label: t('shipment.type'), value: shipment.shipmentType },
                  { label: t('shipment.service'), value: shipment.serviceLevel },
                  { label: t('shipment.packages'), value: shipment.details?.packageCount },
                  { label: t('shipment.weight'), value: shipment.details?.weight ? `${shipment.details.weight} kg` : '-' },
                  { label: t('shipment.value'), value: shipment.details?.declaredValue ? `$${shipment.details.declaredValue}` : '-' },
                  { label: t('shipment.category'), value: shipment.details?.contentCategory },
                ].map((item, i) => (
                  <div key={i} style={{
                    ...styles.card,
                    marginBottom: 0,
                    padding: '18px 20px',
                    textAlign: 'center',
                  }}>
                    <p style={styles.label}>{item.label}</p>
                    <p style={styles.value}>{item.value || '-'}</p>
                  </div>
                ))}
              </div>

              {/* Option Badges */}
              {shipment.options && (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {shipment.options.isFragile && (
                    <span style={{
                      backgroundColor: '#FFF8E1', color: '#F57F17', border: '1px solid #FFE082',
                      padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, fontFamily: FONT_FAMILY,
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      <span className="material-icons-round" style={{ fontSize: '16px' }}>warning_amber</span>
                      {t('shipment.fragile')}
                    </span>
                  )}
                  {shipment.options.requiresInsurance && (
                    <span style={{
                      backgroundColor: '#E3F2FD', color: '#1565C0', border: '1px solid #90CAF9',
                      padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, fontFamily: FONT_FAMILY,
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      <span className="material-icons-round" style={{ fontSize: '16px' }}>shield</span>
                      {t('shipment.insured')}
                    </span>
                  )}
                  {shipment.options.requiresSignature && (
                    <span style={{
                      backgroundColor: '#EDE7F6', color: '#4527A0', border: '1px solid #B39DDB',
                      padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, fontFamily: FONT_FAMILY,
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      <span className="material-icons-round" style={{ fontSize: '16px' }}>draw</span>
                      {t('shipment.signatureRequired')}
                    </span>
                  )}
                </div>
              )}

              {/* Sender & Receiver */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                {/* Sender */}
                <div style={styles.card}>
                  <div style={styles.sectionTitle}>
                    <span className="material-icons-round" style={{ fontSize: '22px', color: '#3b82f6' }}>flight_takeoff</span>
                    {t('shipment.sender')}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: 1.8, fontFamily: FONT_FAMILY }}>
                    <p style={{ margin: 0, fontWeight: 600, color: '#0f172a', fontSize: '15px' }}>{shipment.sender?.name}</p>
                    {shipment.sender?.company && (
                      <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '14px' }}>{shipment.sender.company}</p>
                    )}
                    <p style={{ margin: '10px 0 0', color: '#475569', fontSize: '13px', lineHeight: 1.8 }}>
                      {shipment.sender?.address?.street}<br />
                      {shipment.sender?.address?.city}, {shipment.sender?.address?.state} {shipment.sender?.address?.zip}<br />
                      {shipment.sender?.address?.country}
                    </p>
                    <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontSize: '13px', color: '#64748b' }}>
                      <p style={{ margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-icons-round" style={{ fontSize: '15px', color: '#94a3b8' }}>mail</span>
                        {shipment.sender?.email}
                      </p>
                      <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-icons-round" style={{ fontSize: '15px', color: '#94a3b8' }}>phone</span>
                        {shipment.sender?.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Receiver */}
                <div style={styles.card}>
                  <div style={styles.sectionTitle}>
                    <span className="material-icons-round" style={{ fontSize: '22px', color: '#22c55e' }}>flight_land</span>
                    {t('shipment.receiver')}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: 1.8, fontFamily: FONT_FAMILY }}>
                    <p style={{ margin: 0, fontWeight: 600, color: '#0f172a', fontSize: '15px' }}>{shipment.receiver?.name}</p>
                    {shipment.receiver?.company && (
                      <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '14px' }}>{shipment.receiver.company}</p>
                    )}
                    <p style={{ margin: '10px 0 0', color: '#475569', fontSize: '13px', lineHeight: 1.8 }}>
                      {shipment.receiver?.address?.street}<br />
                      {shipment.receiver?.address?.city}, {shipment.receiver?.address?.state} {shipment.receiver?.address?.zip}<br />
                      {shipment.receiver?.address?.country}
                    </p>
                    <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', fontSize: '13px', color: '#64748b' }}>
                      <p style={{ margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-icons-round" style={{ fontSize: '15px', color: '#94a3b8' }}>mail</span>
                        {shipment.receiver?.email}
                      </p>
                      <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-icons-round" style={{ fontSize: '15px', color: '#94a3b8' }}>phone</span>
                        {shipment.receiver?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Contents */}
              {shipment.details?.contents && (
                <div style={styles.card}>
                  <div style={styles.sectionTitle}>
                    <span className="material-icons-round" style={{ fontSize: '22px', color: '#64748b' }}>inventory_2</span>
                    {t('shipment.packageContents')}
                  </div>
                  <p style={styles.bodyText}>{shipment.details.contents}</p>
                </div>
              )}

              {/* Tracking Timeline */}
              {shipment.locations && shipment.locations.length > 0 && (
                <div style={{ ...styles.card, padding: '28px 32px' }}>
                  <div style={styles.sectionTitle}>
                    <span className="material-icons-round" style={{ fontSize: '22px', color: '#3b82f6' }}>timeline</span>
                    {t('shipment.shipmentActivity')}
                  </div>
                  {shipment.locations.map((loc, idx) => {
                    const ts = formatTimestamp(loc.timestamp, i18n.language);
                    const isFirst = idx === 0;
                    const isLast = idx === shipment.locations.length - 1;
                    return (
                      <div key={idx} style={{ display: 'flex', gap: '18px', position: 'relative' }}>
                        {/* Timeline dot + line */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
                          <div style={{
                            width: isFirst ? '14px' : '10px',
                            height: isFirst ? '14px' : '10px',
                            borderRadius: '50%',
                            backgroundColor: isFirst ? '#3b82f6' : '#e2e8f0',
                            border: isFirst ? '3px solid #bfdbfe' : 'none',
                            flexShrink: 0,
                            marginTop: '5px',
                          }} />
                          {!isLast && (
                            <div style={{ width: '2px', flex: 1, backgroundColor: '#e2e8f0', minHeight: '40px' }} />
                          )}
                        </div>
                        {/* Content */}
                        <div style={{ paddingBottom: isLast ? 0 : '28px', flex: 1 }}>
                          <p style={{
                            margin: '0 0 3px',
                            fontWeight: isFirst ? 700 : 500,
                            color: isFirst ? '#0f172a' : '#334155',
                            fontSize: '14px',
                            textTransform: 'capitalize',
                            fontFamily: FONT_FAMILY,
                          }}>
                            {loc.location}
                          </p>
                          <p style={{
                            margin: '0 0 6px',
                            color: '#94a3b8',
                            fontSize: '12px',
                            fontWeight: 500,
                            fontFamily: FONT_FAMILY,
                          }}>
                            {ts.date} · {ts.time}
                          </p>
                          {loc.description && (
                            <p style={{ ...styles.bodyText, fontSize: '13px', color: '#64748b' }}>
                              {loc.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Special Instructions */}
              {shipment.specialInstructions && (
                <div style={{
                  ...styles.card,
                  borderLeft: '4px solid #f59e0b',
                  marginBottom: 0,
                }}>
                  <div style={styles.sectionTitle}>
                    <span className="material-icons-round" style={{ fontSize: '22px', color: '#f59e0b' }}>info</span>
                    {t('shipment.specialInstructions')}
                  </div>
                  <p style={{ ...styles.bodyText, whiteSpace: 'pre-wrap' }}>
                    {shipment.specialInstructions}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Page>
  );
}
