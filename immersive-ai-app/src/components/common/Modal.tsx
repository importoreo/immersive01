import React, { useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { BaseComponentProps, ModalCloseHandler } from '../../types';
import { cn } from '../../utils';

interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: ModalCloseHandler;
  title?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  closeOnOverlayClick = true,
  size = 'md',
  className
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  return (
    <div className="modal-backdrop" onClick={closeOnOverlayClick ? onClose : undefined}>
      <div 
        className={cn('modal-content', sizeClasses[size], className)}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            {title && (
              <h2 className="text-white font-semibold text-lg">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="닫기"
              >
                <Icon name="FiX" size={24} />
              </button>
            )}
          </div>
        )}
        <div className="overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 