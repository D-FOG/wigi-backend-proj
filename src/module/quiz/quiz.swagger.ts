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
 *  post:
 *    summary: Student attempts a quiz
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
 *        description: Quiz submitted successfully
 *      400:
 *        description: Quiz already attempted
 *      404:
 *        description: Quiz questions not found
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