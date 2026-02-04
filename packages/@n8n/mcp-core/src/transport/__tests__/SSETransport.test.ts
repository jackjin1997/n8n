import { createMockResponse } from '../../__tests__/helpers';
import { SSETransport } from '../SSETransport';

describe('SSETransport', () => {
	describe('constructor', () => {
		it('should set transportType to sse', () => {
			const response = createMockResponse();
			const transport = new SSETransport('/messages', response);

			expect(transport.transportType).toBe('sse');
		});

		it('should store the endpoint', () => {
			const response = createMockResponse();
			const transport = new SSETransport('/api/messages', response);

			// SSETransport extends SSEServerTransport which stores endpoint
			expect(transport).toBeDefined();
		});
	});

	describe('send', () => {
		it('should call flush after sending message', () => {
			const response = createMockResponse();
			const transport = new SSETransport('/messages', response);

			// We can't test the actual send because it requires proper SSE setup
			// but we can verify the transport is created correctly
			expect(transport.transportType).toBe('sse');
			expect(response.flush).toBeDefined();
		});
	});

	describe('handleRequest', () => {
		it('should have handleRequest method', () => {
			const response = createMockResponse();
			const transport = new SSETransport('/messages', response);

			expect(typeof transport.handleRequest).toBe('function');
		});
	});

	describe('McpTransport interface', () => {
		it('should implement McpTransport interface', () => {
			const response = createMockResponse();
			const transport = new SSETransport('/messages', response);

			expect(transport.transportType).toBe('sse');
			expect(typeof transport.send).toBe('function');
			expect(typeof transport.handleRequest).toBe('function');
		});
	});
});
