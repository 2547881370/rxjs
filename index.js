window.onload = () => {
    // 宣告一個觀察者，具備 next, error, complete 三個方法
    var observer = {
        next: function (value) {
            console.log(value, '接收到的值');
        },
        error: function (error) {
            console.log(error)
        },
        complete: function () {
            console.log('complete')
        }
    }

    /**************************************************************** */
    
    // 基础写法
    // var observable = Rx.Observable
    // 	.create(function(observer) {
    // 			observer.next('Jerry');
    // 			observer.next('Anna');
    // 			observer.complete();
    // 			observer.next('not work');
    // 	})

    // 如果有现成的数据时, 可以直降将数据输送给观察者 , 使用of方法 , 观察者会依次接受到 1 , 2 
    // var observable =  Rx.Observable.of(1,2)

    // 如果有现成的数据时, 且是一个数组,使用from方法,观察者会依次接受到 1 , 2
    // var observable = Rx.Observable.from([1,2])

    // 定时给观察者输送数据
    // var observable = Rx.Observable.create(function(observer){
    //   let index = 0
    //   observer.next("立即输送一条数据")
    //   setInterval(() => {
    //     observer.next("立即输送一条数据" + ' : ' + index)
    //     index++
    //     if(index > 10){
    //       observer.complete()
    //     }
    //   },1000)
    // })

    // 观察者会每隔1秒接受到数值, 数值是自增 从0开始
    // var observable = Rx.Observable.interval(1000)

    // 订阅者1秒后会发送第一条数据, 接着每隔5秒发送一条数据, 数据是数值,自增, 从0开始
    // var observable = Rx.Observable.timer(1000,5000)

    // 观察者依次会接收到 h e l l o
    // var observable = Rx.Observable.from("hello")

    // zip可以将两个流合并,只输出两个流在同一时间都输出的值
    // var observable = Rx.Observable.from("hello").zip(Rx.Observable.interval(1000) , (x , y) => {
    //     /**
    //      * h  ---   0   , x y
    //      * e  ---   1   , x y
    //      * l  ---   2   , x y
    //      * l  ---   3   , x y
    //      * o  ---   4   , x y
    //      */
    //     console.log(x , y , "x y ")
    //     return x
    // })

    // scan 类似于数组方法 reduce方法
    /**
     * 观察者依次接受到的值是,每次接收到的值是间隔1秒
     * h
     * he
     * hel
     * hell
     * hello
     */
    // var observable = Rx.Observable.from("hello").zip(Rx.Observable.interval(1000) , (x , y) => {
    //     /**
    //      * h  ---   0   , x y
    //      * e  ---   1   , x y
    //      * l  ---   2   , x y
    //      * l  ---   3   , x y
    //      * o  ---   4   , x y
    //      */
    //     console.log(x , y , "x y ")
    //     return x
    // }).scan((origin , next) => origin + next)

    // 两秒后,观察者才会接受到数据,接受数据的频率是300毫米
    // var observable = Rx.Observable.interval(300).take(5).delay(2000)

    // 防抖 debounceTime
    // 观察者只接收到了一个数据 . 19
    // var observable = Rx.Observable.interval(300).take(20).debounceTime(1000)

    // 节流 throttleTime
    // var observable = Rx.Observable.interval(300).take(20).throttleTime(1000)

    // 过滤 distinct, 只取出唯一的值, 每次取值时会吧之前取取出来的值进行对比,如果重复,观察者者接收不到
    // var observable = Rx.Observable.from(["a" , 'b' , "c" , "d" , "e" , "a" , "b" ,"d" ,"w"]).zip(Rx.Observable.interval(300) , (x , y)  => x ).distinct()

    /**************************************************************** */


    /* ------------------------------------------------------------- */

    /**************************************************************** */
    // 同时存在多个流时的处理

    // concatAll 这里有一个流abc ,经过map方法,生成了3个流的数组,把生成的数据，依次串联起来，发布给观察者
    /**
     * 0
     * 1
     * 2
     * 0
     * 1
     * 2
     * 0
     * 1
     * 2
     */
    // var observable = Rx.Observable.from("abc").map(() => Rx.Observable.interval(300).take(3)).concatAll()

    // zip 两个流同在同一时间产生的数据,派发给观察者,有点类似于数组的并集感觉
    // var observable = Rx.Observable.interval(300).take(10).zip(Rx.Observable.interval(1000).take(5) , ( x , y ) => x + y)

    // switch 监听多个流,哪个流有数据产生,就一直监听那个流,如果此时其他流也有数据,那么就换一个另外一个流去监听数据, 派发给观察者
    // var click = Rx.Observable.fromEvent(document.body, 'click');
    // var source = click.map(() => Rx.Observable.interval(1000));
    // var observable = source.switch();

    // merge 同时监听两个流，哪个流有数据了就取出来， 如果同时都有， 同时取出来

    // mergeArr 同时监听多个流， 与merge类似

    /**************************************************************** */

    /* ------------------------------------------------------------- */

    /**************************************************************** */
    // 在把数据抛给观察者之前， 可以进一步做一个处理

    // map 对数据重新组合
    // var source = Rx.Observable.interval(1000); 
    // var observable = source.map(x => x + 1)

    // mapTo 对数据重新赋值成同一个值
    // var source = Rx.Observable.interval(1000);
    // var observable = source.mapTo(2);

    // filter 对数据进行过滤
    // var source = Rx.Observable.interval(1000);
    // var observable = source.filter(x => x % 2 === 0);

    // catch 对数据的处理，如果有报错异常，可以捕获到
    // var source = Rx.Observable.from(['a', 'b', 'c', 'd', 2])
    //     .zip(Rx.Observable.interval(500), (x, y) => x);
    // var observable = source
    //     .map(x => x.toUpperCase())
    //     .catch(error => Rx.Observable.of('h'));

    // retry 捕获到数据处理异常后， 可以重新将数据重复的发一遍给观察者 ， 注意 ： 只有数据处理异常后， 都会重复将数据发给观察者，次数不限， 也可以填写次数
    // var source = Rx.Observable.from(['a', 'b', 'c', 'd', 2])
    //     .zip(Rx.Observable.interval(500), (x, y) => x);

    // var observable = source
    //     .map(x => x.toUpperCase())
    //     .retry();

    /**************************************************************** */

    // 用我們定義好的觀察者，來訂閱這個 observable	
    observable.subscribe(observer)
}