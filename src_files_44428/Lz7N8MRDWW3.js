;/*FB_PKG_DELIM*/

__d("WAWebBizRemoveDirectConnectionKeysBridge",["Promise","WAWebBusinessDirectConnectionCollection","WAWebDirectConnectionGatingUtils"],(function(a,b,c,d,e,f,g){var h;function a(a){return d("WAWebDirectConnectionGatingUtils").supportsDirectConnection()&&!0?c("WAWebBusinessDirectConnectionCollection").removeCypher(a):(h||(h=b("Promise"))).resolve()}g.removeDirectConnectionKeys=a}),98);