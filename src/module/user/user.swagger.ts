/** 
 * @openapi
 * tags:
 *   name: User
 *   description: User Profile Management
 */

/**
 * @openapi
 * /v1/users/profile:   
 *  get:
 *    summary: Get a User Profile 
 *    tags: 
 *      - User
 *    security:
 *      -bearerAuth: []
 *    responses:
 *      200:
 *        description: Profile Fetched successfully
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/users/profile:
 *  put:
 *   summary: Update User Profile
 *   tags:
 *    - User
 *   security:
 *     -bearerAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       mutipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             profilePicture:
 *               type: sring
 *               format: binary
 *             about:
 *               type: string
 *             headline:
 *               type: string
 *             companyName:
 *               type: string
 *             state: 
 *               type: string
 *             country: 
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             phoneNumber: 
 *               type: string
 *     responses:
 *       200:
 *         description: Profile Updated successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /v1/users/account:
 *  delete:
 *    summary: Delete User Account
 *    tags:
 *      - User
 *    security:
 *      -bearerAuth: []
 *    responses:
 *      200:
 *        description: Account Deleted Successfully
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 */
