/**
 * @openapi
 * tags:
 *   name: Quiz Admin
 *   description: Quiz Management for Courses
 */

/**
 * @openapi
 * /v1/admin/modules/{moduleId}/quiz:
 *   post:
 *     summary: Create a quiz for a course module
 *     tags:
 *       - Quiz Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course module ID
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       400:
 *         description: Quiz already exists for this module
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       404:
 *         description: Module not found
 */

/**
 * @openapi
 * /v1/admin/quizzes/{quizId}/questions:
 *   post:
 *     summary: Add a question to a quiz
 *     tags:
 *       - Quiz Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - options
 *               - correctOptionIndex
 *             properties:
 *               question:
 *                 type: string
 *                 example: What does HTTP stand for?
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - HyperText Transfer Protocol
 *                   - HyperText Transmission Process
 *                   - HighText Transfer Protocol
 *               correctOptionIndex:
 *                 type: number
 *                 example: 0
 *     responses:
 *       201:
 *         description: Question added successfully
 *       400:
 *         description: Invalid correct option index
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       404:
 *         description: Quiz not found
 */

/**
 * @openapi
 * /v1/admin/quiz-questions/{questionId}:
 *   patch:
 *     summary: Update a quiz question
 *     tags:
 *       - Quiz Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: What is REST?
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Representational State Transfer
 *                   - Remote State Transfer
 *                   - Relational State Transfer
 *               correctOptionIndex:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       400:
 *         description: Invalid correct option index
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       404:
 *         description: Quiz question not found
 */

/**
 * @openapi
 * /v1/admin/quiz-questions/{questionId}:
 *   delete:
 *     summary: Delete a quiz question
 *     tags:
 *       - Quiz Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz question ID
 *     responses:
 *       200:
 *         description: Quiz question deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       404:
 *         description: Quiz question not found
 */
