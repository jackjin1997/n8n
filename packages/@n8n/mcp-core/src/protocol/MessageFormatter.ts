import type { McpToolResult } from './types';

export class MessageFormatter {
	static formatToolResult(result: unknown): McpToolResult {
		if (typeof result === 'object' && result !== null) {
			return { content: [{ type: 'text', text: JSON.stringify(result) }] };
		}
		if (typeof result === 'string') {
			return { content: [{ type: 'text', text: result }] };
		}
		if (result === null || result === undefined) {
			return { content: [{ type: 'text', text: String(result) }] };
		}
		// Remaining types: number, boolean, bigint, symbol, function
		// These all have proper toString implementations
		return { content: [{ type: 'text', text: `${result as number | boolean | bigint}` }] };
	}

	static formatError(error: Error): McpToolResult {
		return {
			isError: true,
			content: [{ type: 'text', text: `Error: ${error.message}` }],
		};
	}
}
