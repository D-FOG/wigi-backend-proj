/**
 * @openapi
 * tags:
 *   name: Quiz
 *   description: Quiz Management for Courses
 */

/**
 * @openapi
 * /v1/student/quiz/{quizId}:
 *  get:
 *    summary: Student fetches quiz details if available
 *    tags:
 *      - Quiz
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: quizId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Quiz fetched successfully
 *      400:
 *        description: Quiz already attempted
 *      404:
 *        description: Quiz not found
 */
 
/**
 * @openapi
 * /v1/student/quiz/{quizId}/attempt:
 *   post:
 *     summary: Submit a quiz attempt
 *     description: >
 *       Allows a student to submit answers for a module quiz.
 *       A quiz can only be attempted once.
 *       Submission must occur within the quiz duration (e.g. 5 minutes).
 *     tags:
 *       - Student Quiz
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the quiz to attempt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *               - startedAt
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1, 0, 2, 3]
 *                 description: >
 *                   Array of selected option indexes for each question,
 *                   ordered by question index.
 *               startedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-02-03T20:10:00.000Z"
 *                 description: Timestamp when the quiz was started (used for timer validation)
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Quiz submitted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     score:
 *                       type: number
 *                       example: 3
 *                     totalQuestions:
 *                       type: number
 *                       example: 5
 *                     attempted:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Bad request (already attempted, time elapsed, invalid answers)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quiz or questions not found
 */

/**
 * @openapi
 * /v1/student/course/{courseId}/exam/eligibility:
 *  get:
 *    summary: Check student's eligibility for final exam
 *    tags:
 *      - Quiz
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: courseId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Eligibility checked successfully
 */

/**
 * @openapi
 * /v1/student/course/{courseId}/final-exam:
 *  get:
 *    summary: Fetch final exam for a course
 *    tags:
 *      - Quiz
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: courseId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: final exam fetched successfully
 *      400:
 *        description: Final exam already taken
 *      403:
 *        description: Eligibility criteria not met
 */

/**
 * @openapi
 * /v1/student/course/{courseId}/final-exam/submit:
 *  post:
 *    summary: Submit final exam for a course
 *    tags:
 *      - Quiz
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: courseId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Final exam submitted successfully
 *      400:
 *        description: Final exam already submitted
 */