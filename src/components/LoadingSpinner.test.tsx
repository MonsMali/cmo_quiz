import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
    it('should render with default size', () => {
        const { container } = render(<LoadingSpinner />);
        const spinner = container.querySelector('.w-10');
        expect(spinner).toBeInTheDocument();
    });

    it('should render with custom text', () => {
        render(<LoadingSpinner text="Loading quiz..." />);
        expect(screen.getByText('Loading quiz...')).toBeInTheDocument();
    });

    it('should render with small size', () => {
        const { container } = render(<LoadingSpinner size="sm" />);
        const spinner = container.querySelector('.w-6');
        expect(spinner).toBeInTheDocument();
    });

    it('should render with large size', () => {
        const { container } = render(<LoadingSpinner size="lg" />);
        const spinner = container.querySelector('.w-16');
        expect(spinner).toBeInTheDocument();
    });

    it('should not render text when not provided', () => {
        const { container } = render(<LoadingSpinner />);
        const text = container.querySelector('p');
        expect(text).toBeNull();
    });
});
