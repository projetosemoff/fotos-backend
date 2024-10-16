import { left, right, Either } from "@/core/either";
import { Photographer } from "../../enterprise/entities/photographer";
import { PhotographerAlreadyExistsError } from "../errors/photographer-already-exists";
import { PhotographerRepository } from "../repositories/photographer-repository";
import { HashGenerator } from "@/core/cryptography/hash-generator";

interface RegisterPhotographerUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

type RegisterPhotographerUseCaseResponse = Either<
	PhotographerAlreadyExistsError,
	{
		photographer: Photographer;
	}
>;

export class RegisterPhotographerUseCase {
	constructor(
		private photographerRepository: PhotographerRepository,
		private hashGenerator: HashGenerator
	) {}

	async execute({
		name,
		email,
		password,
	}: RegisterPhotographerUseCaseRequest): Promise<RegisterPhotographerUseCaseResponse> {
		const photographerWithSameEmail =
			await this.photographerRepository.findByEmail(email);

		if (photographerWithSameEmail) {
			return left(new PhotographerAlreadyExistsError());
		}

		const hashedPassword = await this.hashGenerator.hash(password);

		const photographer = Photographer.create({
			name,
			email,
			password: hashedPassword,
		});

		await this.photographerRepository.create(photographer);

		return right({ photographer });
	}
}