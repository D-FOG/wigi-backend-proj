/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @openapi
 * /v1/register:
 *   post:
 *     summary: Register a new student
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            oneOf:
 *             - type: object
 *               required:
 *                 - firstName
 *                 - lastName
 *                 - email
 *                 - phoneNumber
 *                 - occupation
 *                 - course
 *                 - courseOfStudy
 *                 - level
 *                 - universityName
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 phoneNumber:
 *                   type: string
 *                 occupation:
 *                   type: string
 *                 course:
 *                   type: string
 *                 courseOfStudy:
 *                   type: string
 *                 level:
 *                   type: string
 *                 universityName:
 *                   type: string
 *             - type: object
 *               required:
 *                 - firstName
 *                 - lastName
 *                 - email
 *                 - phoneNumber
 *                 - ocuppation
 *                 - course
 *                 - jobTitle
 *                 - companyName
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 phoneNumber:
 *                   type: string
 *                 occupation:
 *                   type: string
 *                 course:
 *                   type: string
 *                 jobTitle:
 *                   type: string
 *                 companyName:
 *                   type: string
 *             - type: object
 *               required:
 *                 - firstName
 *                 - lastName
 *                 - email
 *                 - phoneNumber
 *                 - occupation
 *                 - course
 *                 - companyName
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 phoneNumber:
 *                   type: string
 *                 occupation:
 *                   type: string
 *                 course:
 *                   type: string
 *                 companyName:
 *                   type: string
 *     responses:
 *       201:
 *         description: Student registered successfully
 */

/**
 * @openapi
 * /v1/login:
 *   post:
 *     summary: Student login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @openapi
 * /v1/admin/login:
 *   post:
 *     summary: Admin login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin login successful
 */
