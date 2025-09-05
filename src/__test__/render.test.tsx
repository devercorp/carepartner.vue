import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('컴포넌트 렌더', () => {
	render(<div className="header">test</div>);
	const elememt = screen.getByText('test');

	expect(elememt).toBeInTheDocument();
});
