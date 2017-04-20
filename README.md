## DayBookApp
    Ionic2构建的一款流水账记录App。
服务端 GitHub [DayBook](https://github.com/zyqwst/DayBook)

##效果预览
![效果图](http://upload-images.jianshu.io/upload_images/2287481-bf288c00503b171c.gif)
## 启动说明
DayBookApp运行需要API服务器资源支持，服务端代码请查看[DayBook](https://github.com/zyqwst/DayBook)。服务器启动完成后，
需要修改App中服务起访问地址,src/providers/http-service.ts文件修改API服务器访问地址
` hostUrl:string = "http://192.168.1.1:9971"; `

修改成功后，运行命令 `ionic serve`，浏览器打开`http://localhost:8100`即可打开浏览器看到效果。
`http://localhost:8100/ionic-lab`可以看到android、IOS、WP的效果 

## 构建Android App
ionic platform add android
ionic build android 
运行以上命令，提示成功后，在DayBookApp/platforms/android/build/outputs/apk目录下会生成android apk应用。然后可以安装到手机~
