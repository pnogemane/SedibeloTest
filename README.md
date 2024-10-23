
In this document, I will explain the technical details, design choices, and approaches I used to implement the backend simulation
and data-handling solution for Sedibelo Technologies. This solution focuses on security, performance, and scalability while
addressing real-world challenges such as data deduplication, encryption, efficient file handling, secure communication, and
idempotent API requests.

This solution demonstrates my ability to design and implement secure, efficient, and scalable backend systems. I followed best
practices for encryption, API communication, file handling, and WebSocket interaction. The use of MongoDB ensured that the query
for the Engineering department was optimized to handle large datasets. I also implemented rate-limiting, CSRF protection, and retry
logic to ensure security and reliability.

The project showcases my expertise in handling complex data operations, secure communication, and real-time interaction while
ensuring performance and scalability in modern web applications.
The solution utilizes Node.js for backend operations, file streaming for efficient data management, and WebSocket for real-time
communication. Throughout the implementation, I adhered to modern development practices, ensuring robust security and smooth
handling of large datasets.

Task 1.1 - Simulating Secure Login Form Submission
This step simulates the submission of a login form securely to an HTTPS endpoint. It required implementing rate-limiting to prevent
brute-force attacks and CSRF protection to ensure secure form submission. On successful login, the server returns a session token
and a list of users, which needed to be encrypted and stored locally.

Technical Approach

HTTPS Communication : HTTPS ensures secure transmission by encrypting data between the client and server. For this task, I
used axios, a promise-based HTTP client, to make secure POST requests to the endpoint.

CSRF Protection : To mitigate Cross-Site Request Forgery (CSRF) attacks, I generated a CSRF token using Node.js’s crypto
module. The token would ideally be stored in a user’s session and validated server-side on form submission. This token prevents
unauthorized form submissions initiated from external sites.

Rate-Limiting: I implemented rate-limiting to limit the number of login attempts within a specific time window. This helps prevent
brute-force attacks by blocking excessive login attempts from the same IP address. I used express-rate-limit middleware, which
provides configurable rate-limiting functionality.
Data Encryption and Storage:I encrypted the users’ data using the AES-256-CBC encryption algorithm. AES-256 provides strong
encryption, ensuring that sensitive information is stored securely. The encrypted user list was saved to users.json for later use.

Task 1.2 - Data Handling, Deduplication, and Performance Optimization

The task required reading the user data from users.json, removing duplicate entries, and assigning a UUID to each unique user. 
I also needed to generate a CSV file showing the number of times each user was duplicated. The solution had to be optimized to
handle large datasets efficiently, simulating scenarios with millions of entries.

Technical Approach

Reading Large Files with Streaming : Using file streaming minimizes memory usage when dealing with large datasets. I used
JSONStream to read the contents of users.json incrementally. Unlike loading the entire file into memory, streaming allows processing
large files chunk by chunk, preventing memory exhaustion.
Deduplication Logic: I utilized a Map data structure to store users, ensuring uniqueness based on their email address. This
approach allows for O(1) time complexity for insertion and lookup operations, ensuring efficient deduplication even with millions of
records.

UUID Generation : Each unique user was assigned a Universally Unique Identifier (UUID) using the uuid library. UUIDs ensure that
every user has a unique, non-colliding identifier, even when distributed across different systems.
CSV Generation for Duplicate Counts : I used fast-csv to generate a CSV file containing the Name, Surname, and Number of
Times Duplicated for each user. Fast-csv efficiently handles large datasets and generates the CSV incrementally, ensuring that the
memory footprint remains low.

Incremental File Writes : To improve performance, the data was written in small chunks to avoid memory bottlenecks.
Asynchronous Operations : An additional performance advancement was to make sure that all file I/O operations were performed
asynchronously to prevent blocking the event loop.

Lazy Evaluation : Lazy evaluation allowed the system to process the data only when needed, improving performance for large
datasets.

Task 1. 3 - Simulating Secure User Data Posting

The task involved securely posting user data from uniqueUsers.json to the specified endpoint with idempotency and retry logic for
failed requests. Each user’s data included the session token received during login.

Technical Approach

API Communication : I used axios to post each user’s data. The payload included all required fields, including the user’s name,
surname, designation, department, and unique UUID, along with the session token for authentication.
Idempotency Handling : Idempotency ensures that repeated API calls produce the same result without unintended side effects.
Each user’s UUID served as a unique identifier, preventing duplicate entries on the server.
Retry Logic for Failed Requests : I implemented retry logic using the axios-retry middleware. This ensured that in case of network
failures or server issues, the request would be retried up to a certain limit, increasing the reliability of the system.
Task 1.4 Engineering Department Reporting
From the list of unique users, I needed to identify those in the Engineering department and determine how many people (Mechanics
and Mechanic Assistants) report to Michael Phalane. The query had to be optimized to handle large datasets using a NoSQL
database such as MongoDB.

Technical Approach

Database Selection : I used MongoDB due to its flexible schema design, which is ideal for handling hierarchical data structures.
MongoDB’s query capabilities also allow for efficient filtering and aggregation, even with large datasets
Query Optimization : I created a compound index on the department and designation fields to speed up the query.
Aggregation Pipelines : I used an aggregation pipeline to filter users in the Engineering department and group them by their
manager (Michael Phalane).
Sharding Consideration : For scalability, the solution could be extended to use sharding in MongoDB, distributing the dataset
across multiple nodes for improved performance.
Task 1. 5 WebSocket Client
The goal was to create a WebSocket client that connects to the server, sends a string, and verifies that the returned string matches
its reversed version.

Technical Approach

WebSocket Connection : I used the ws library to establish a WebSocket connection to the provided endpoint. WebSockets provide
full-duplex communication, enabling real-time data exchange.
Verification Mechanism : After sending a string to the server, the server returns the reversed string. I implemented a simple string
comparison logic to verify that the returned string matches the reversed version of the original input.
Task 1.6 Fibonacci Sequence Generator
The task required generating the Fibonacci sequence up to the nth number and returning the nth Fibonacci number.
Technical Approach
Iterative Approach for Efficiency : I opted for an iterative approach to generate the Fibonacci sequence. This approach is more
efficient than recursion, with a time complexity of O(n) and constant space complexity O(1).
Handling Large Numbers : For very large Fibonacci numbers, I ensured that the solution could handle BigInt values to prevent
overflow.

Task 2: Backend Simulation and Data Handling Solution for Sedibelo Technologies

Introduction

This document outlines the technical details, design choices, and methodologies I implemented for the backend simulation and
data-handling solution tailored for Sedibelo Technologies. The solution emphasizes security, performance, and scalability while
addressing practical challenges like data deduplication, efficient file handling, secure communication, and idempotent API requests.
The backend simulation and data-handling solution I developed for Sedibelo Technologies effectively addresses key challenges
such as real-time data processing, secure communication, and efficient data management. By employing modern development
practices and robust security measures, I ensured that the system is both scalable and reliable, meeting the needs of users in a
dynamic environment.

Through this project, I demonstrated proficiency in designing and implementing secure, efficient, and scalable backend systems.
The architecture employed modern development practices to ensure robust security and effective handling of extensive datasets.

Task 2.1 - Secure WebSocket Communication

The initial task involved establishing a secure WebSocket connection to facilitate real-time data exchange between the client and
server.

Technical Approach

WebSocket Implementation: Utilized the socket.io library for real-time communication, ensuring compatibility across different
browsers.
·Secure Connection: Configured the WebSocket to use a secure (wss) protocol, establishing encrypted connections between clients
and the server.
Event Handling: Set up event listeners to handle incoming messages and errors, enabling responsive real-time interactions.

Task 2.2 - Real-Time Data Processing

This step required processing incoming data from the WebSocket in real time, ensuring that the application responded promptly to
user actions and server events.

Technical Approach

Data Handling Logic: Implemented a centralized data management system to process incoming WebSocket events and update the
application state accordingly.
Data Transformation: Ensured incoming data was transformed into a suitable format for use in the application (e.g., charts, tables).
Event-Driven Architecture: Employed an event-driven model to allow different components of the application to react independently
to data changes.

Task 2.3 - Data Storage and Retrieval

Developed a solution for storing and retrieving processed data efficiently, focusing on performance and scalability.
Technical Approach
Database Selection: Choose MongoDB for its NoSQL capabilities, allowing for flexible schema design and efficient querying.
Data Modeling: Designed the database schema to accommodate various data types and relationships, optimizing for read and write
operations.

Indexing Strategies: Implemented indexing strategies to improve query performance, particularly for frequently accessed data.

Task 2.4 - Data Visualization

This task involved creating a dynamic front-end that visualizes data received from the backend, providing users with actionable
insights.

Technical Approach

Charting Libraries: Used libraries like Chart.js to create responsive and interactive charts that display real-time data.
State Management: Implemented Vuex for managing the application state, ensuring consistent data flow across components.
Responsive Design: Ensured that the front-end components were responsive and user-friendly, allowing seamless access on
various devices.

Task 2.5 - Security Measures

In this task, I focused on implementing security measures to protect user data and ensure safe communication.

Technical Approach

Input Validation: Validated all incoming data on both the client and server sides to prevent injection attacks.
·Authentication and Authorization: Implemented token-based authentication, ensuring that only authorized users could access
sensitive data.
·Data Encryption: Utilized AES encryption for sensitive data at rest and in transit, enhancing overall security.

Task 2.6 - Performance Optimization

The final step involved optimizing the application for performance, ensuring that it could handle a large volume of simultaneous
connections and data.

Technical Approach

Load Testing: Conducted load testing to evaluate the system’s performance under various conditions and identify bottlenecks.
Caching Strategies: Implemented caching strategies using Redis to store frequently accessed data, reducing database load and
improving response times.
Asynchronous Processing: Leveraged asynchronous programming paradigms to enhance responsiveness and prevent blocking
during data processing.

Task 3 - CRUD operations with IndexedDB and a RESTful API for Sedibelo Technologies.

In this document, I will provide a detailed explanation of the technical approach, design decisions, and implementation strategies I
used to develop secure CRUD operations with IndexedDB and a RESTful API for Sedibelo Technologies. My focus throughout was
on security, performance, scalability, and reliability—ensuring that the system meets modern development standards and can handle
real-world challenges.
The use of IndexedDB for local client-side storage is an effective way to store structured data offline, and I integrated encryption
using the Web Crypto API to ensure sensitive information remains protected. Furthermore, I built a RESTful API with Node.js to
enable secure communication between the frontend and backend, providing seamless data management.

This solution demonstrates my ability to design and implement secure, efficient, and scalable CRUD operations using IndexedDB for
local storage and Node.js with Express for backend simulation. The Web Crypto API ensures that all sensitive data is encrypted,
and session tokens provide secure communication with the backend. I focused on reliability, idempotency, and performance,
ensuring that the system can handle real-world challenges effectively.
This project reflects my expertise in managing encrypted data, building RESTful APIs, and optimizing performance for modern web
applications.

Task 3.1 - Initializing IndexedDB for Secure Data Storage

The first step involved setting up IndexedDB to handle the secure storage of user data on the client side. IndexedDB is ideal for this
purpose due to its ability to store large datasets locally in a structured format.I structured the IndexedDB database with an object
store for user records, using UUIDs (Universally Unique Identifiers) as unique keys for each entry.
UUIDs ensured that all records remain globally unique, even if duplicated across distributed systems. To maintain smooth user
interactions, I ensured that all operations—such as reads and writes—are asynchronous, preventing the application from freezing or
becoming unresponsive.
Using IndexedDB also aligns with modern web standards because it enables the application to function offline while keeping data
synchronized when back online.

The asynchronous nature of IndexedDB is a core feature that improves frontend performance by preventing blocking operations
(Mozilla, 2023). Its design supports complex key-value pair storage, which makes it an excellent tool for handling structured data in
progressive web apps.

Task 3.2 - Encrypting Data Using the Web Crypto API

Given that the data stored in IndexedDB may contain sensitive information, my next priority was to encrypt the data before saving it.
This step ensures that even if unauthorized access to the IndexedDB database occurs, the stored data will remain unreadable.
I used the AES-GCM (Advanced Encryption Standard with Galois/Counter Mode) for encryption, as it provides both confidentiality
and data integrity. AES-GCM is highly efficient and widely recommended for secure web applications due to its minimal overhead
and built-in message authentication.
To generate encryption keys securely, I relied on password-based encryption where the key is derived from a user-provided
password through PBKDF2 (Password-Based Key Derivation Function 2). This approach eliminates the risk of hardcoding keys into
the system. Additionally, each encryption operation uses a unique Initialization Vector (IV) to ensure that even identical data will
have distinct encrypted outputs.

AES-GCM is favored in modern web encryption because it provides fast and secure encryption with authentication (NIST, 2021).
Using PBKDF2 for key derivation enhances security by adding a salt and iterating the hashing function, which mitigates brute-force
attacks.

Task 3.3 - Implementing CRUD Operations

The next step involved developing the full range of Create, Read, Update, and Delete (CRUD) operations for managing encrypted
data within IndexedDB. The goal was to ensure data security while enabling smooth user interactions.

Technical Approach:

● Create: I encrypt user data using AES-GCM and store it in IndexedDB with a UUID as the key.
● Read: When fetching data, I decrypt it on the fly, ensuring that decrypted information is only available temporarily in
memory.
● Update: I retrieve, decrypt, modify, and re-encrypt existing records to maintain data consistency.
● Delete: Records are removed based on their UUID, ensuring that outdated or irrelevant data is securely deleted.
I designed these operations to be idempotent—repeated requests will produce the same outcome, ensuring reliability in case of
network or system failures. This ensures that even if a user initiates multiple updates or deletes, the database remains consistent
and without duplicate entries.Idempotency is a crucial principle in modern web design, especially for APIs and database operations
(Fielding, 2000). It ensures system stability and consistency, particularly when handling unpredictable user behavior or network
disruptions.

Task 3.4 - RESTful API Implementation with Node.js

To enable secure communication between the client-side IndexedDB storage and the backend, I developed a RESTful API using
Node.js and Express. The API facilitates data synchronization, ensuring that the frontend and backend can operate in tandem.

Technical Approach:

● Endpoints:
○ /uniqueUsers: Retrieves all unique users stored in the IndexedDB database.
○ /addUser: Adds a new user entry to the database.
○ /updateUser: Updates an existing user’s details.
○ /deleteUser: Removes a user based on their UUID.
I ensured that all API calls are authenticated using session tokens to prevent unauthorized access. Each request includes a session
token generated upon login, verifying the user's identity.
Additionally, I incorporated retry logic to handle network issues, ensuring that failed requests are retried a certain number of times
before giving up. This ensures a robust and resilient system capable of handling intermittent connectivity issues.
RESTful APIs are a standard for communication in modern applications due to their scalability and stateless design (Fielding, 2000).
Using session tokens for authentication ensures that API interactions remain secure and protected from unauthorized access.

Task 3.5 - Security Considerations

My primary concern throughout this task was ensuring that all stored and transmitted data remains secure. I integrated several
layers of security to safeguard user data.

Technical Approach:

● Encryption: All data in IndexedDB is encrypted using AES-GCM, ensuring confidentiality and integrity.
● Secure Communication: The RESTful API requires session tokens for all operations to prevent unauthorized access.
● Unique IVs for Encryption: Each encryption uses a new Initialization Vector to prevent ciphertext reuse.
● Idempotent Operations: The CRUD operations were designed to ensure consistency and stability, even with repeated
requests.
These measures ensure that the system adheres to modern security best practices and remains resilient against common attack
vectors like unauthorized access and brute-force attacks.
Literature Reference:
The use of AES-GCM encryption and session-based authentication aligns with OWASP’s recommendations for secure storage and
communication (OWASP, 2024).
Task 3.6 - Performance and Scalability Considerations
I optimized the system to handle large datasets and multiple operations simultaneously without sacrificing performance.

Technical Approach:

● IndexedDB for Local Storage: IndexedDB's large storage capacity makes it suitable for storing extensive datasets offline.
● Batch Processing: I grouped operations into batches to reduce overhead and improve performance.
● Lazy Decryption: Data is decrypted only when required, minimizing the impact on memory usage.
These optimizations ensure that the system performs efficiently under various conditions, even with large datasets or multiple
simultaneous operations.

Task 4 - Security, Performance, and Scalability

In this document, I will explain the technical details, design decisions, and approaches I employed to solve Task 4 for Sedibelo
Technologies. As with the previous tasks, this solution emphasizes security, performance, and scalability. Task 4 continues to
address real-world software challenges such as data integrity, reporting accuracy, complex querying, and optimized API
communication.

This solution showcases my ability to design and implement secure, scalable, and efficient backend systems. I followed best
practices for API communication, data handling, real-time notifications, and fault tolerance. The use of MongoDB provided the
flexibility needed to manage complex datasets and relationships.
By implementing idempotency handling, retry logic, and WebSocket-based notifications, I ensured that the solution is both reliable
and responsive. The system is built with performance and scalability in mind, ready to grow as the organization expands.

Through this task, I demonstrated my expertise in handling complex queries, optimizing backend operations, and building systems
that adhere to modern software development practices.
This solution involves advanced backend development using Node.js and MongoDB for managing large datasets. I incorporated
asynchronous processing, transactional integrity, and complex filtering logic to ensure that the system performs reliably under
realistic scenarios. The principles of modularity, reusable code, and API idempotency guided the design, ensuring the solution is
both robust and extensible.

Task 4.1: Advanced Data Reporting and Role Management

This task involved creating a report that identifies specific roles in the organization, focusing on users reporting to particular
managers. I had to ensure accurate reporting from the Engineering department and handle large datasets with optimized queries.

Technical Approach

1. Database Design & Optimization:
○ I used MongoDB as the database engine due to its ability to store semi-structured data efficiently.
○ Indexes were created on relevant fields (e.g., department and designation) to enhance query performance.
○ A compound index on manager and designation fields was employed to facilitate complex queries involving
hierarchical relationships.
2. Aggregation Pipeline:
○ MongoDB’s aggregation pipeline was leveraged to group and filter users based on their roles, department, and
reporting structure.
○ This allowed me to extract the list of Mechanics and Mechanic Assistants who report directly to Michael
Phalane.

3. Handling Hierarchical Relationships:

○ To ensure that the solution scales for future growth, I employed recursive querying techniques to support nested
reporting relationships.
○ The reporting system was built with modularity in mind, so it could be extended to other departments or complex
hierarchies beyond Engineering.
Task 4.2: Secure Data Submission and Idempotency Management
This part of the task involved securely submitting user and role data to a remote API, ensuring idempotency and preventing
duplicate entries. I also implemented retry logic for network failures.
Technical Approach
1. API Communication with Axios:
○ I used the Axios library to perform POST requests, securely submitting user data. Each request was
authenticated with a session token to maintain secure communication.
2. Idempotency Handling:
○ A UUID was assigned to each user entry to ensure that duplicate submissions are prevented at the API level.
○ The server recognized requests based on the UUID, ensuring the same operation could be safely retried
without unintended consequences.
3. Retry Logic for Reliability:
○ Axios-Retry middleware was used to implement retry logic, with exponential backoff to prevent flooding the
server. This ensured that transient network issues didn’t disrupt the submission process.
○ I set the retry limit to three attempts, after which failures were logged for later review.

Task 4.3: Error Handling and Data Integrity Validation


This task required ensuring that the entire process was fault-tolerant, with robust error handling and validation logic. I needed to
ensure data consistency even if parts of the process failed.

Technical Approach

1. Transaction Management with MongoDB:

○ I used MongoDB’s transactions to ensure atomicity when performing multiple operations (e.g., inserting user
data and updating reports simultaneously).
○ If any part of the transaction failed, the entire operation would roll back to prevent partial data updates.

2. Schema Validation:
○ I implemented schema validation at the database level to ensure that incoming data followed the required
structure (e.g., valid names, roles, and departments).
○ This approach prevents corrupted or malformed data from being saved.

3. Error Logging:
○ Any errors encountered during data submission or query execution were logged to a centralized error
management system. This helps with troubleshooting and ensures continuous improvement of the system.
Task 4.4: Performance Optimization and Scalability Planning
With the potential for handling thousands of users and multiple departments, I focused on optimizing the solution for performance
and future scalability.

Technical Approach

1. Asynchronous Operations:

○ I ensured that all file I/O and database operations were performed asynchronously to avoid blocking the event
loop and to maintain the responsiveness of the system.

2. Database Sharding:
○ Although not implemented immediately, I designed the database structure to allow for future sharding across
multiple nodes, distributing the load for improved performance at scale.

3. Caching Frequently Accessed Data:

○ I used in-memory caching (e.g., Redis or Node.js caches) to store frequently accessed data such as user roles
and department lists, reducing the load on the database.
Task 4.5: Reporting Dashboard and Analytics
I developed a reporting module that provides managers with insights into the structure and performance of the organization, with a
focus on the Engineering department.
Technical Approach

1. Real-Time Reporting:
○ The reporting dashboard pulls data dynamically from the database, reflecting real-time changes in the
organizational structure.

2. CSV Export:
○ I implemented a CSV export feature, allowing managers to download reports on users, roles, and department
structures. This feature was built with streaming capabilities to handle large data exports without consuming
excessive memory.

Task 4.6 : WebSocket Implementation for Real-Time Notifications

I added a WebSocket client to enable real-time notifications for managers when significant changes occur (e.g., new users or
changes in reporting structures).
Technical Approach

1. WebSocket Client Setup:

○ Using the ws library, I established a connection between the client and the server for full-duplex communication.

2. Change Notification Mechanism:
○ Whenever a change is detected in the database (e.g., a new user added), the server sends a real-time
notification to the client through the WebSocket connection.

3. Error Recovery:
○ I implemented logic to automatically reconnect the WebSocket client if the connection drops, ensuring
continuous operation.
