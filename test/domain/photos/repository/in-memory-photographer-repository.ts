import type { Photographer } from "@/domain/photos/enterprise/entities/photographer";
import { AbstractRepositoryImpl } from "@test/repositories/abstract-repository-impl";

export class InMemoryPhotographerRepository<
	T extends Photographer,
> extends AbstractRepositoryImpl<T> {
	async findByEmail(email: string): Promise<T | null> {
		const item = this.items.find((item) => item.email.toString() === email);
		return item || null;
	}
}