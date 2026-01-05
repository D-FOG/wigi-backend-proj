/**
 * @openapi
 * tags:
 *   name: Course
 *   description: User Views Courses and Enrolls for course
 */

/**
 * @openapi
 * /v1/courses
 *  get:
 *    summary: User views courses
 *    tags:
 *      - Course
 *    security:
 *      -bearerAuth: []
 *    responses:
 *      200:
 *        description: Courses fetched
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/courses/{courseId}
 *  get:
 *    summary: User views a single course
 *    tags:
 *      - Course
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
 *        description: Course fetched
 *      404:
 *        description: Course not found
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/courses/{courseId}/enroll
 *  post:
 *    summary: User enrolls in a course
 *    tags:
 *      - Course
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
 *        description: Enrolled successfully
 *      400:
 *        description: Already enrolled
 *      404:
 *        description: Course not found
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/my-courses
 *  get:
 *    summary: User views all enrolled courses
 *    tags:
 *      - Course
 *    security:
 *      -bearerAuth: []
 *    responses:
 *      200:
 *        description: My Courses fetched
 *      401:
 *        description: Unauthorized
 */

/**
 * @openapi
 * /v1/my-courses/{courseId}
 *  get:
 *    summary: User views a single enrolled courses
 *    tags:
 *      - Course
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
 *        description: My Course fetched
 *      403:
 *        description: Not enrolled
 *      401:
 *        description: Unauthorized
 */
/**
 * @openapi
 * /v1/my-courses/{courseId}/topics:/{topicId}/complete:
 *  post:
 *    summary: User views a single enrolled courses
 *    tags:
 *      - Course
 *    security:
 *      -bearerAuth: []
 *    parameters: 
 *      - in: path
 *        name: courseId
 *        required: true
 *        schema:
 *          type: string
 * 
 *      - in: path
 *        name: topicId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Topic completed
 *      403:
 *        description: Not enrolled
 *      401:
 *        description: Unauthorized
 */