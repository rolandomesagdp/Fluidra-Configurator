import { Subject, Subscription } from 'rxjs';

export class SubscriptionsManager {
	private subscriptions: Subscription = new Subscription();
	public destroy$: Subject<void> = new Subject();

	public add(subscription: Subscription): void {
		this.subscriptions.add(subscription);
	}

	public unsubscribe(): void {
		this.subscriptions.unsubscribe();

		if (this.destroy$) {
			this.destroy$.next();
			this.destroy$.complete();
		}
	}
}
