import '@testing-library/jest-dom';
// matchers 임포트
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
	cleanup();
});
