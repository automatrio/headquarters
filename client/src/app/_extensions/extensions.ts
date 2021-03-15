// class List<T> extends Array<T> {
//     remove: (elem: T) => Array<T> = function(elem: T) {
//         return this.filter(e => e !== elem);
//     }
// }

interface Array<T> {
    remove(o: T): Array<T>;
}

Array.prototype.remove = function (index: number) {
    const newArray: any[] = [];
    for (let i = 0; i < this.length; i++) {
        if(i != index)
        {
            newArray.push(this[i]);
        }
    }

    return newArray;
}