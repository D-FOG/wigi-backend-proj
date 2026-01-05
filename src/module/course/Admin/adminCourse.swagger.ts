/**
 * @openapi
 * tags:
 *   name: Admin
 *   description: Admin endpoints to add courses, modules and topics
 */

/**
 * @openapi
 * /v1/admin/courses
 *  post:
 *    summary: Admin Adds User courses
 *    tags:
 *      - Admin
 *    security:
 *      -bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *    responses:
 *      200:
 *        description: Course Created successfully
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/admin/courses/{courseId}/modules
 *  post:
 *    summary: Admin Adds modules in course
 *    tags:
 *      - Admin
 *    security:
 *      -bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: courseId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              order:
 *                type: number
 *    responses:
 *      200:
 *          description: Module Created successfully
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/admin/modules/{moduleId}/topics
 *  post:
 *    summary: Admin Adds Topics in Module
 *    tags:
 *      - Admin
 *    security:
 *      -bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: moduleId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              order:
 *                type: number
 *              material:
 *                type: string
 *                format: binary
 *    responses:
 *      200:
 *        description: Topic Created successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Module not found
 *      400:
 *        description PDF material is required
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/admin/courses/{courseId}
 *  put:
 *    summary: Admin updates course
 *    tags:
 *      - Admin
 *    security:
 *      -bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: courseId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              isPublished:
 *                type: boolean
 *    responses:
 *      200:
 *        description: Course updated successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Course not found
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/admin/courses/{courseId}
 *  delete:
 *    summary: Admin deletes course
 *    tags:
 *      - Admin
 *    security:
 *      -bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: courseId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Course deleted successfully
 *      400:
 *        description: Bad request
 *      404: 
 *        description: Course not found
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/admin/modules/{moduleId}
 *  put:
 *    summary: Admin updates module
 *    tags:
 *      - Admin
 *    security:
 *      -bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: moduleId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              order:
 *                type: number
 *    responses:
 *      200:
 *        description: Module updated successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Module not found
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/admin/modules/{moduleId}
 *  delete:
 *    summary: Admin deletes module
 *    tags:
 *      - Admin
 *    security:
 *      -bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: moduleId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: module deleted successfully
 *      400:
 *        description: Bad request
 *      404: 
 *        description: Module not found
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/admin/topics/{topicId}
 *  put:
 *    summary: Admin updates topic
 *    tags:
 *      - Admin
 *    security:
 *      -bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: topicId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              materialUrl:
 *                type: string
 *    responses:
 *      200:
 *        description: Topic updated successfully
 *      400:
 *        description: Bad request
 *      404:
 *        description: Topic not found
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/admin/topics/{topicId}
 *  delete:
 *    summary: Admin deletes topic
 *    tags:
 *      - Admin
 *    security:
 *      -bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: topicId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Topic deleted successfully
 *      400:
 *        description: Bad request
 *      404: 
 *        description: Topic not found
 *      401:
 *        description: Unauthorized
 */