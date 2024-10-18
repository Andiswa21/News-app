import React from 'react';

const PrivacyModal = ({ show, onAccept }) => {
  if (!show) return null; // Don't render if not shown

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Privacy Policy</h5>
            <button type="button" className="close" onClick={onAccept} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Please accept our privacy policy to continue using the application.</p>
            <p>Your data will be handled in accordance with our privacy policy.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onAccept}>Accept</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
