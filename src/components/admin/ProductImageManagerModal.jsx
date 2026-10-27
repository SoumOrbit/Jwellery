import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Image as ImageIcon,
  Star,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const ProductImageManagerModal = ({ isOpen, onClose, product, onSave }) => {
  const { uploadImage } = useAdmin();
  const [images, setImages] = useState(() => (product && product.images ? [...product.images] : []));
  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'url'
  const [urlInput, setUrlInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Sync state if product changes
  React.useEffect(() => {
    if (product && product.images) {
      setImages([...product.images]);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleFileProcess = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WEBP, or GIF).');
      return;
    }
    setUploadError('');
    setUploading(true);

    try {
      const res = await uploadImage(file);
      if (res && res.success && res.url) {
        setImages(prev => [...prev, res.url]);
      } else {
        setUploadError(res?.message || 'Failed to upload image. Please try again.');
      }
    } catch (err) {
      setUploadError('An unexpected error occurred during image upload.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleFileProcess(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFileProcess(file);
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    const clean = urlInput.trim();
    if (!clean) return;
    setImages(prev => [...prev, clean]);
    setUrlInput('');
    setUploadError('');
  };

  const handleRemove = (index) => {
    if (images.length <= 1) {
      setUploadError('A creation must have at least one image in its gallery.');
      return;
    }
    setImages(prev => prev.filter((_, i) => i !== index));
    setUploadError('');
  };

  const handleSetPrimary = (index) => {
    if (index === 0) return;
    setImages(prev => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.unshift(item);
      return copy;
    });
  };

  const handleSetSecondary = (index) => {
    if (index === 1 || images.length < 2) return;
    setImages(prev => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      // Insert at position 1 (hover slot)
      copy.splice(1, 0, item);
      return copy;
    });
  };

  const handleMove = (index, dir) => {
    const targetIdx = index + dir;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    setImages(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const handleSave = () => {
    if (images.length === 0) {
      setUploadError('Please include at least one photo for this piece.');
      return;
    }
    onSave(images);
    onClose();
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-image-manager-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow">
              <Sparkles size={13} className="text-gold" /> Atelier Atelier Media Studio
            </span>
            <h2 className="modal-title">Manage Product Imagery</h2>
            <p className="modal-subtitle">
              Configure photos for <strong>{product.name}</strong>. The first image serves as the Main Gallery Hero, and the second image powers the smooth luxury hover flip.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {uploadError && (
          <div className="modal-alert-error">
            <span>{uploadError}</span>
          </div>
        )}

        <div className="modal-body">
          {/* Section 1: Current Gallery Images */}
          <div className="gallery-slots-section">
            <div className="slots-header">
              <h3 className="section-subheading">Current Gallery Photos ({images.length})</h3>
              <span className="slots-tip">Use the controls on each card to arrange Primary and Hover views.</span>
            </div>

            <div className="image-slots-grid">
              {images.map((imgUrl, index) => {
                const isPrimary = index === 0;
                const isHover = index === 1;

                return (
                  <div key={index} className={`image-slot-card ${isPrimary ? 'is-primary' : ''} ${isHover ? 'is-hover' : ''}`}>
                    <div className="slot-img-wrap">
                      <img src={imgUrl} alt={`Product slot ${index + 1}`} />
                      
                      {/* Slot Role Badges */}
                      {isPrimary && (
                        <span className="slot-role-badge primary-badge">
                          <Star size={11} fill="#C5A059" /> Primary Hero
                        </span>
                      )}
                      {isHover && (
                        <span className="slot-role-badge hover-badge">
                          <RefreshCw size={11} /> Hover Flip View
                        </span>
                      )}
                      {!isPrimary && !isHover && (
                        <span className="slot-role-badge angle-badge">
                          Angle #{index + 1}
                        </span>
                      )}

                      {/* Delete button */}
                      <button 
                        type="button" 
                        className="slot-delete-btn" 
                        onClick={() => handleRemove(index)}
                        title="Remove image"
                        aria-label="Remove image"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="slot-actions">
                      <div className="slot-reorder-btns">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMove(index, -1)}
                          title="Move Left"
                          className="btn-slot-reorder"
                        >
                          <ArrowLeft size={13} />
                        </button>
                        <span className="slot-index-num">{index + 1}</span>
                        <button
                          type="button"
                          disabled={index === images.length - 1}
                          onClick={() => handleMove(index, 1)}
                          title="Move Right"
                          className="btn-slot-reorder"
                        >
                          <ArrowRight size={13} />
                        </button>
                      </div>

                      <div className="slot-role-assigners">
                        {!isPrimary && (
                          <button
                            type="button"
                            className="btn-set-role"
                            onClick={() => handleSetPrimary(index)}
                            title="Set as Main Primary View"
                          >
                            Set Primary
                          </button>
                        )}
                        {!isHover && images.length > 1 && (
                          <button
                            type="button"
                            className="btn-set-role"
                            onClick={() => handleSetSecondary(index)}
                            title="Set as Hover Secondary View"
                          >
                            Set Hover
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Upload / Add New Photos */}
          <div className="upload-new-section">
            <h3 className="section-subheading">Add New Creation Photo</h3>
            
            <div className="upload-tabs-nav">
              <button 
                type="button"
                className={`upload-tab-btn ${activeTab === 'file' ? 'active' : ''}`}
                onClick={() => setActiveTab('file')}
              >
                <Upload size={14} /> Upload from Computer
              </button>
              <button 
                type="button"
                className={`upload-tab-btn ${activeTab === 'url' ? 'active' : ''}`}
                onClick={() => setActiveTab('url')}
              >
                <ExternalLink size={14} /> Add Image Link (URL)
              </button>
            </div>

            {activeTab === 'file' ? (
              <div 
                className={`file-dropzone ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  style={{ display: 'none' }}
                />

                <div className="dropzone-content">
                  {uploading ? (
                    <div className="upload-loading-state">
                      <RefreshCw size={28} className="spinner-icon text-gold" />
                      <p className="upload-status-text">Uploading high-resolution jewelry photo...</p>
                    </div>
                  ) : (
                    <>
                      <div className="dropzone-icon-circle">
                        <Upload size={24} className="text-gold" />
                      </div>
                      <p className="dropzone-headline">
                        <strong>Click to browse</strong> or drag and drop your jewelry photo here
                      </p>
                      <span className="dropzone-subtext">
                        Supports PNG, JPG, or WEBP up to 10MB.
                      </span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddUrl} className="url-input-form">
                <div className="url-input-row">
                  <input
                    type="url"
                    placeholder="Paste image URL (e.g., https://images.unsplash.com/...)"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="form-control url-input-field"
                  />
                  <button type="submit" className="btn-add-url" disabled={!urlInput.trim()}>
                    <Plus size={15} /> Add URL
                  </button>
                </div>
                <span className="url-hint">
                  Tip: Direct links ending in .jpg, .png, or Unsplash photo links work best.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="modal-footer-stats">
            <span>{images.length} {images.length === 1 ? 'image' : 'images'} configured</span>
          </div>
          <div className="modal-footer-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="button" 
              className="btn-primary btn-save-photos"
              onClick={handleSave}
            >
              <Check size={16} /> Save &amp; Apply Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageManagerModal;
