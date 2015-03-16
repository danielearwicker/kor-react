declare module Kor {

    interface SubscribableFunctions<T> {
    	notifySubscribers(valueToWrite?: T, event?: string): void;
    }

    interface ComputedFunctions<T> {
    }

    interface ObservableFunctions<T> {
    	equalityComparer(a: any, b: any): boolean;
    }

    interface ObservableArrayFunctions<T> {
        // General Array functions
        indexOf(searchElement: T, fromIndex?: number): number;
        slice(start: number, end?: number): T[];
        splice(start: number): T[];
        splice(start: number, deleteCount: number, ...items: T[]): T[];
        pop(): T;
        push(...items: T[]): void;
        shift(): T;
        unshift(...items: T[]): number;
        reverse(): T[];
        sort(): void;
        sort(compareFunction: (left: T, right: T) => number): void;

        // Ko specific
        replace(oldItem: T, newItem: T): void;

        remove(item: T): T[];
        remove(removeFunction: (item: T) => boolean): T[];
        removeAll(items: T[]): T[];
        removeAll(): T[];

        destroy(item: T): void;
        destroy(destroyFunction: (item: T) => boolean): void;
        destroyAll(items: T[]): void;
        destroyAll(): void;
    }

    interface SubscribableStatic {
        fn: SubscribableFunctions<any>;

        new <T>(): Subscribable<T>;
    }

    interface Subscription {
    	dispose(): void;
    }

    interface Subscribable<T> extends SubscribableFunctions<T> {
    	subscribe(callback: (newValue: T) => void, target?: any, event?: string): Subscription;
    	subscribe<TEvent>(callback: (newValue: TEvent) => void, target: any, event: string): Subscription;
    	extend(requestedExtenders: { [key: string]: any; }): Subscribable<T>;
    	getSubscriptionsCount(): number;
    }

    interface ComputedStatic {
        fn: ComputedFunctions<any>;

        <T>(): Computed<T>;
        <T>(func: () => T, context?: any, options?: any): Computed<T>;
        <T>(def: ComputedDefine<T>, context?: any): Computed<T>;
    }

    interface Computed<T> extends Observable<T>, ComputedFunctions<T> {
    	fn: ComputedFunctions<any>;

    	dispose(): void;
    	isActive(): boolean;
    	getDependenciesCount(): number;
        extend(requestedExtenders: { [key: string]: any; }): Computed<T>;
    }

    interface ObservableArrayStatic {
        fn: ObservableArrayFunctions<any>;

        <T>(value?: T[]): ObservableArray<T>;
    }

    interface ObservableArray<T> extends Observable<T[]>, ObservableArrayFunctions<T> {
        extend(requestedExtenders: { [key: string]: any; }): ObservableArray<T>;
    }

    interface ObservableStatic {
        fn: ObservableFunctions<any>;

        <T>(value?: T): Observable<T>;
    }

    interface Observable<T> extends Subscribable<T>, ObservableFunctions<T> {
    	(): T;
    	(value: T): void;
    	peek(): T;
    	valueHasMutated?:{(): void;};
    	valueWillMutate?:{(): void;};
        extend(requestedExtenders: { [key: string]: any; }): Observable<T>;
    }

    interface ComputedDefine<T> {
    	read(): T;
    	write? (value: T): void;
    	disposeWhen? (): boolean;
    	owner?: any;
    	deferEvaluation?: boolean;
    	pure?: boolean;
    }

    interface Extenders {
        throttle(target: any, timeout: number): Computed<any>;
    	notify(target: any, notifyWhen: string): any;
    	rateLimit(target: any, timeout: number): any;
    	rateLimit(target: any, options: { timeout: number; method?: string; }): any;
    	trackArrayChanges(target: any): any;
    }

    interface Utils {
        arrayForEach<T>(array: T[], action: (item: T) => void): void;
        arrayIndexOf<T>(array: T[], item: T): number;
        arrayRemoveItem(array: any[], itemToRemove: any): void;
        extend(target: Object, source: Object): Object;
        unwrapObservable<T>(value: Observable<T> | T): T;
        peekObservable<T>(value: Observable<T>): T;
    }

    interface ArrayChange<T> {
        status: string;
        value: T;
        index: number;
        moved?: number;
    }

    interface ExecuteThenable<T> {
        then(done: (result: T) => void): any;
    }

    interface Static {
        utils: Utils;
        extenders: Extenders;
        subscribable: SubscribableStatic;
        observable: ObservableStatic;
    	computed: ComputedStatic;
    	pureComputed<T>(evaluatorFunction: () => T, context?: any): Computed<T>;
    	pureComputed<T>(options: ComputedDefine<T>, context?: any): Computed<T>;
        observableArray: ObservableArrayStatic;
        isSubscribable(instance: any): boolean;
        toJS(viewModel: any): any;
        isObservable(instance: any): boolean;
        isWriteableObservable(instance: any): boolean;
        isComputed(instance: any): boolean;
    	unwrap<T>(value: Observable<T> | T): T;
    	computedContext: ComputedContext;

        execute<T>(
            pureComputed: Computed<any>,
            evaluatorFunction: () => T,
            thisObj?: any): Computed<T>;

        unpromise<T>(
            evaluatorFunction: () => T | ExecuteThenable<T>,
            options?: {
                initialValue?: T;
                errorValue?: T;
                thisArg?: any;
            }): Computed<T>;

        isPureComputed(obs: any): boolean;
    }

    interface ComputedContext {
    	getDependenciesCount(): number;
    	isInitial: () => boolean;
    	isSleeping: boolean;
    }
}

declare module "kor" {
    var s: Kor.Static;
	  export = s;
}
