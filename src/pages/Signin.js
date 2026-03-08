/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { CircularProgress } from '@mui/material';
import Page from '../components/Page';
import logoSvg from '../assets/ship4wd-logo.png';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { getshipment } from '../redux/slices/shipments/getshipment';

// ----------------------------------------------------------------------

const STATUS_COLORS = {
  'On Hold': { bg: '#fff3cd', text: '#856404', icon: '⏸' },
  'In Transit': { bg: '#d1ecf1', text: '#0c5460', icon: '🚚' },
  'Delivered': { bg: '#d4edda', text: '#155724', icon: '✅' },
  'Cancelled': { bg: '#f8d7da', text: '#721c24', icon: '✕' },
  'Processing': { bg: '#e2e3f1', text: '#383d8a', icon: '⏳' },
};

function formatTimestamp(ts) {
  if (!ts || !ts.seconds) return '';
  const date = new Date(ts.seconds * 1000);
  return {
    date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
}

// ----------------------------------------------------------------------

export default function Signin() {
  const { shipment, isLoading, error } = useSelector((state) => state.getShipment || {});
  const dispatch = useDispatch();
  const [trackingNumber, setTrackingNumber] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      dispatch(getshipment(trackingNumber.trim()));
      console.log('Searching for shipment:', trackingNumber.trim());
    }
  };

  React.useEffect(() => {
    if (shipment && !isLoading && !error) {
      console.log('Shipment data fetched successfully:', shipment);
    }
  }, [shipment, isLoading, error]);

  const statusStyle = shipment ? (STATUS_COLORS[shipment.status] || STATUS_COLORS.Processing) : null;

  return (
    <Page title="Track Shipment">
      <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
          padding: '40px 20px 80px',
          textAlign: 'center',
        }}>
          <a href="/">
            <img src={logoSvg} alt="Ship4wd" style={{ height: '50px', marginBottom: '30px', filter: 'brightness(0) invert(1)' }} />
          </a>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', margin: '0 0 8px' }}>
            Track Your Shipment
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', margin: 0 }}>
            Enter your tracking number below to get real-time updates
          </p>
        </div>

        {/* Search Bar — pulled up over the header */}
        <div style={{ maxWidth: '640px', margin: '-40px auto 0', padding: '0 16px', position: 'relative', zIndex: 1 }}>
          <form onSubmit={handleSearch}>
            <div style={{
              display: 'flex',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              overflow: 'hidden',
            }}>
              <input
                type="text"
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '18px 20px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  color: '#1a1a1a',
                  backgroundColor: 'transparent',
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !trackingNumber.trim()}
                style={{
                  padding: '18px 32px',
                  backgroundColor: (isLoading || !trackingNumber.trim()) ? '#bbb' : '#1a237e',
                  color: '#fff',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: (isLoading || !trackingNumber.trim()) ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {isLoading ? 'Searching...' : 'Track'}
              </button>
            </div>
          </form>
        </div>

        {/* Content area */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 16px 60px' }}>

          {/* Loading */}
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <CircularProgress size={44} thickness={4} style={{ color: '#1a237e' }} />
              <p style={{ marginTop: '16px', color: '#666', fontSize: '15px' }}>Looking up your shipment...</p>
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              marginTop: '10px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
              <h3 style={{ margin: '0 0 8px', color: '#d32f2f', fontSize: '18px' }}>Shipment Not Found</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                {error}. Please double-check your tracking number and try again.
              </p>
            </div>
          )}

          {/* Shipment Results */}
          {shipment && !isLoading && !error && (
            <>
              {/* Status Header Card */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '24px 28px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}>
                <div>
                  <p style={{ margin: '0 0 4px', color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Tracking Number
                  </p>
                  <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1a1a1a', fontFamily: "'Courier New', monospace" }}>
                    {shipment.trackingNumber}
                  </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  {shipment.estimatedPickupDate && (
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: '0 0 2px', color: '#888', fontSize: '11px', textTransform: 'uppercase' }}>Est. Pickup</p>
                      <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#1a1a1a' }}>{shipment.estimatedPickupDate}</p>
                    </div>
                  )}
                  <div style={{
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                  }}>
                    {statusStyle.icon} {shipment.status}
                  </div>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
                marginBottom: '20px',
              }}>
                {[
                  { label: 'Type', value: shipment.shipmentType },
                  { label: 'Service', value: shipment.serviceLevel },
                  { label: 'Packages', value: shipment.details?.packageCount },
                  { label: 'Weight', value: shipment.details?.weight ? `${shipment.details.weight} kg` : '-' },
                  { label: 'Value', value: shipment.details?.declaredValue ? `$${shipment.details.declaredValue}` : '-' },
                  { label: 'Category', value: shipment.details?.contentCategory },
                ].map((item, i) => (
                  <div key={i} style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    textAlign: 'center',
                  }}>
                    <p style={{ margin: '0 0 4px', color: '#888', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {item.label}
                    </p>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#1a1a1a', textTransform: 'capitalize' }}>
                      {item.value || '-'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Options Badges */}
              {shipment.options && (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {shipment.options.isFragile && (
                    <span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '8px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500' }}>
                      ⚠ Fragile
                    </span>
                  )}
                  {shipment.options.requiresInsurance && (
                    <span style={{ backgroundColor: '#d1ecf1', color: '#0c5460', padding: '8px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500' }}>
                      🛡 Insured
                    </span>
                  )}
                  {shipment.options.requiresSignature && (
                    <span style={{ backgroundColor: '#e2e3f1', color: '#383d8a', padding: '8px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500' }}>
                      ✍ Signature Required
                    </span>
                  )}
                </div>
              )}

              {/* Sender & Receiver */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                {/* Sender */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      backgroundColor: '#e8eaf6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px',
                    }}>📤</div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>From (Sender)</h4>
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#333' }}>
                    <p style={{ margin: 0, fontWeight: '600' }}>{shipment.sender?.name}</p>
                    {shipment.sender?.company && (
                      <p style={{ margin: 0, color: '#666' }}>{shipment.sender.company}</p>
                    )}
                    <p style={{ margin: '8px 0 0', color: '#555', fontSize: '13px' }}>
                      {shipment.sender?.address?.street}<br />
                      {shipment.sender?.address?.city}, {shipment.sender?.address?.state} {shipment.sender?.address?.zip}<br />
                      {shipment.sender?.address?.country}
                    </p>
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0', fontSize: '13px', color: '#555' }}>
                      <p style={{ margin: '0 0 4px' }}>{shipment.sender?.email}</p>
                      <p style={{ margin: 0 }}>{shipment.sender?.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Receiver */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      backgroundColor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px',
                    }}>📥</div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>To (Receiver)</h4>
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#333' }}>
                    <p style={{ margin: 0, fontWeight: '600' }}>{shipment.receiver?.name}</p>
                    {shipment.receiver?.company && (
                      <p style={{ margin: 0, color: '#666' }}>{shipment.receiver.company}</p>
                    )}
                    <p style={{ margin: '8px 0 0', color: '#555', fontSize: '13px' }}>
                      {shipment.receiver?.address?.street}<br />
                      {shipment.receiver?.address?.city}, {shipment.receiver?.address?.state} {shipment.receiver?.address?.zip}<br />
                      {shipment.receiver?.address?.country}
                    </p>
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0', fontSize: '13px', color: '#555' }}>
                      <p style={{ margin: '0 0 4px' }}>{shipment.receiver?.email}</p>
                      <p style={{ margin: 0 }}>{shipment.receiver?.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Contents */}
              {shipment.details?.contents && (
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  marginBottom: '20px',
                }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>
                    📋 Package Contents
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                    {shipment.details.contents}
                  </p>
                </div>
              )}

              {/* Tracking Timeline */}
              {shipment.locations && shipment.locations.length > 0 && (
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '24px 28px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  marginBottom: '20px',
                }}>
                  <h4 style={{ margin: '0 0 24px', fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>
                    📍 Shipment Activity
                  </h4>
                  {shipment.locations.map((loc, idx) => {
                    const ts = formatTimestamp(loc.timestamp);
                    const isFirst = idx === 0;
                    const isLast = idx === shipment.locations.length - 1;
                    return (
                      <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                        {/* Timeline column */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
                          <div style={{
                            width: isFirst ? '14px' : '10px',
                            height: isFirst ? '14px' : '10px',
                            borderRadius: '50%',
                            backgroundColor: isFirst ? '#1a237e' : '#c5cae9',
                            border: isFirst ? '3px solid #c5cae9' : 'none',
                            flexShrink: 0,
                            marginTop: '4px',
                          }} />
                          {!isLast && (
                            <div style={{
                              width: '2px',
                              flex: 1,
                              backgroundColor: '#e0e0e0',
                              minHeight: '40px',
                            }} />
                          )}
                        </div>
                        {/* Content */}
                        <div style={{ paddingBottom: isLast ? 0 : '24px', flex: 1 }}>
                          <p style={{ margin: '0 0 2px', fontWeight: isFirst ? '600' : '500', color: isFirst ? '#1a237e' : '#1a1a1a', fontSize: '14px', textTransform: 'capitalize' }}>
                            {loc.location}
                          </p>
                          <p style={{ margin: '0 0 6px', color: '#999', fontSize: '12px' }}>
                            {ts.date} at {ts.time}
                          </p>
                          {loc.description && (
                            <p style={{ margin: 0, color: '#666', fontSize: '13px', lineHeight: '1.5' }}>
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
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderLeft: '4px solid #ff9800',
                }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>
                    Special Instructions
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
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
