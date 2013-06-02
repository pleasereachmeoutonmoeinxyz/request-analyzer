Request Analyzer
================

* What is request analyzer?

Request Analyzer is simple proxy server which log important details of connections such as posted data,url,cookies,host and ...


* Why I developed it?

I need to analyze some firefox addons to see what they collect aboud me,so I develop this to be sure about my privacy when using addons and extensions. But you can use it for other aims. 

##Usage:
before you can run it you should install node.js <a href="https://github.com/nodejitsu/node-http-proxy">**http-proxy**</a> module by npm. 

you can do it by
```
npm install http-proxy
```

* request analyzer has following run arguments:
    - -h or --host to log special request,for example which is stablished to **facebook.com**

    - -p or --port to force http proxy listen on special port (default is 8080)

    - -l or --log to store log in to special file (default is log.txt)

```
nodejs analyzer.js -p 8000 -h moeinhm.ir -l moein.txt
```

above code run proxy server on port number 8000 and filter request for moeinhm.ir and save log to moein.txt.

##Roadmap:
 * add support for https,ws and wss protocols 

##Author:
 * Mohammad Moein Hosseini Manesh
   - <a href="http://moeinhm.ir">Personal Web Site</a>
   - <a href="http://hivemined.ir">Personal blog in Persian</a>
   - <a href="http://moeinhm.ir/en">Personal blog in English</a>
   - <a href="mailto:moein7tl@gmail.com">moein7tl@gmail.com</a>
