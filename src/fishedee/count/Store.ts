import { action, define, model, observable } from "@formily/reactive";

const list = define({
    index: [] as typeof CounterStore[],
    clear() {
        this.index = [];
    }
}, {
    index: observable,
    clear: action
});

const CounterStore = {
    fish: 0,
    cat: 0,
    dec (type: CounterEnum) {
        return this[type]--;
    },
    inc (type: CounterEnum) {
        return this[type]++;
    }
};

function extractMode(index: number) {
    if (list.index[index] === void 0) {
        list.index[index] = model({ ...CounterStore });
    }
    return list.index[index];
}

export type CounterEnum = "cat" | "fish";

export { list };

export default extractMode;