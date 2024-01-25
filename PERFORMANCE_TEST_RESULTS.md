# Introduction

There are k6 performance tests for five different scenarios whose results are listed below. 
The tests were performed on a Thinkpad x230 running Ubuntu.

The performance tests can be run with the following commands in the /k6 folder while the application is running.

`k6 run course-list-performance-test.js`
`k6 run course-page-performance-test.js`
`k6 run submit-question-performance-test.js`
`k6 run question-page-performance-test.js`
`k6 run submit-answer-performance-test.js`

Note that most of the tests include ids of courses and/or questions.
The database should contain courses and questions with these ids before the tests are run.

# Loading the main page (course list)

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: course-list-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 35s max duration (incl. graceful stop):
           * default: 10 looping VUs for 5s (gracefulStop: 30s)


running (05.1s), 00/10 VUs, 338 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  5s

     data_received..................: 6.3 MB 1.2 MB/s
     data_sent......................: 27 kB  5.3 kB/s
     http_req_blocked...............: avg=20.46µs  p(99)=339.98µs
     http_req_connecting............: avg=7.93µs   p(99)=261.97µs
     http_req_duration..............: avg=151.36ms p(99)=336.52ms
       { expected_response:true }...: avg=151.36ms p(99)=336.52ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 338 
     http_req_receiving.............: avg=1.24ms   p(99)=12.96ms 
     http_req_sending...............: avg=29.35µs  p(99)=156.29µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=150.08ms p(99)=335.78ms
     http_reqs......................: 338    65.755585/s
     iteration_duration.............: avg=151.52ms p(99)=336.66ms
     iterations.....................: 338    65.755585/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10

# Navigating to course page


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: course-page-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 35s max duration (incl. graceful stop):
           * default: 10 looping VUs for 5s (gracefulStop: 30s)


running (05.2s), 00/10 VUs, 229 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  5s

     data_received..................: 8.5 MB 1.6 MB/s
     data_sent......................: 39 kB  7.4 kB/s
     http_req_blocked...............: avg=21.88µs  p(99)=687.92µs
     http_req_connecting............: avg=11.79µs  p(99)=475.51µs
     http_req_duration..............: avg=112.53ms p(99)=206.54ms
       { expected_response:true }...: avg=112.53ms p(99)=206.54ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 458 
     http_req_receiving.............: avg=791.79µs p(99)=5.37ms  
     http_req_sending...............: avg=31.06µs  p(99)=231.26µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=111.71ms p(99)=205.38ms
     http_reqs......................: 458    87.551813/s
     iteration_duration.............: avg=225.38ms p(99)=393.21ms
     iterations.....................: 229    43.775907/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10

# Navigating to course page and submitting a question

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: submit-question-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 35s max duration (incl. graceful stop):
           * default: 10 looping VUs for 5s (gracefulStop: 30s)


running (05.3s), 00/10 VUs, 69 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  5s

     data_received..................: 2.6 MB 483 kB/s
     data_sent......................: 23 kB  4.4 kB/s
     http_req_blocked...............: avg=133.5µs  p(99)=3.38ms  
     http_req_connecting............: avg=116.59µs p(99)=3.17ms  
     http_req_duration..............: avg=252.38ms p(99)=2.55s   
       { expected_response:true }...: avg=274.28ms p(99)=2.56s   
     http_req_failed................: 8.69%  ✓ 18        ✗ 189 
     http_req_receiving.............: avg=594.4µs  p(99)=7.31ms  
     http_req_sending...............: avg=80.87µs  p(99)=801.96µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=251.7ms  p(99)=2.55s   
     http_reqs......................: 207    38.757537/s
     iteration_duration.............: avg=758.02ms p(99)=2.84s   
     iterations.....................: 69     12.919179/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10

# Navigating to question page

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: question-page-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 35s max duration (incl. graceful stop):
           * default: 10 looping VUs for 5s (gracefulStop: 30s)


running (05.6s), 00/10 VUs, 90 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  5s

     data_received..................: 5.0 MB 897 kB/s
     data_sent......................: 24 kB  4.2 kB/s
     http_req_blocked...............: avg=56.31µs  p(99)=1.81ms  
     http_req_connecting............: avg=47.7µs   p(99)=1.76ms  
     http_req_duration..............: avg=204.23ms p(99)=370.69ms
       { expected_response:true }...: avg=204.23ms p(99)=370.69ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 270 
     http_req_receiving.............: avg=1.02ms   p(99)=16.77ms 
     http_req_sending...............: avg=36.75µs  p(99)=307.62µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=203.17ms p(99)=370.27ms
     http_reqs......................: 270    48.252627/s
     iteration_duration.............: avg=613.28ms p(99)=738.4ms 
     iterations.....................: 90     16.084209/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10

# Navigating to question page and submitting an answer

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: submit-answer-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 35s max duration (incl. graceful stop):
           * default: 10 looping VUs for 5s (gracefulStop: 30s)


running (05.4s), 00/10 VUs, 121 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  5s

     data_received..................: 6.8 MB 1.3 MB/s
     data_sent......................: 52 kB  9.6 kB/s
     http_req_blocked...............: avg=34.35µs  p(99)=1.29ms  
     http_req_connecting............: avg=22.17µs  p(99)=989.82µs
     http_req_duration..............: avg=109.1ms  p(99)=252.26ms
       { expected_response:true }...: avg=109.1ms  p(99)=252.26ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 484 
     http_req_receiving.............: avg=749.8µs  p(99)=5.38ms  
     http_req_sending...............: avg=35.45µs  p(99)=357.16µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s      
     http_req_waiting...............: avg=108.32ms p(99)=252.15ms
     http_reqs......................: 484    90.099489/s
     iteration_duration.............: avg=437.19ms p(99)=703.32ms
     iterations.....................: 121    22.524872/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10