const app = require('./index');
const request = require('supertest');

// Unit tests using Jest and supertest
describe('GET /plus/:num1/:num2', () => {
    it('should add two numbers correctly', async () => {
        const expectedSum = 10; // Adjust value as needed
        const response = await request(app).get('/plus/5/5');

        expect(response.status).toEqual(200);
        expect(response.text).toEqual(expectedSum.toString());
    });

    // Additional test cases here:
    it('should handle valid base 10 integers', async () => {
        // Test various valid integers and bases
        const testCases = [
            { num1: '10', num2: '20', expectedSum: 30 },
            { num1: '-5', num2: '8', expectedSum: 3 },
            { num1: '0', num2: '0', expectedSum: 0 },
            { num1: '123', num2: '456', expectedSum: 579 },
        ];

        for (const testCase of testCases) {
            const response = await request(app).get(`/plus/${testCase.num1}/${testCase.num2}`);
            expect(response.status).toEqual(200);
            expect(response.text).toEqual(testCase.expectedSum.toString());
        }
    });

    it('should handle non-numeric input gracefully', async () => {
        // Test non-numeric strings
        const testCases = ['abc'];

        for (const testCase of testCases) {
            const response = await request(app).get(`/plus/${testCase}/${testCase}`);
            expect(response.status).toEqual(400); // Or appropriate error status
            expect(response.text).toMatch(/Invalid number/); // Or specific error message
        }
    });

    it('should handle missing parameters with an error', async () => {
        // Test missing or insufficient parameters
        const testCases = ['', '/plus/5', '/plus'];

        for (const testCase of testCases) {
            const response = await request(app).get(testCase);
            expect(response.status).toEqual(404); // Or appropriate error status
            expect(response.text).toMatch(/Cannot GET/); // Or specific error message
        }
    });
});