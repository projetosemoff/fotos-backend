import { Entity } from "@/core/entities/entity";
import { EntityID } from "@/core/entities/entity-id";
import { Optional } from "@/core/types/optional";

interface PhotoProps {
  name: string;
  link: string;
  createdAt: Date;
  inactivatedAt?: Date;
}

export class Photo extends Entity<PhotoProps> {
  get name(): string {
    return this.props.name;
  }

  get link(): string {
    return this.props.link;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get inactivatedAt(): Date | undefined {
    return this.props.inactivatedAt;
  }

  set inactivatedAt(inactivatedAt: Date | undefined) {
    this.props.inactivatedAt = inactivatedAt;
  }

  static create(props: Optional<PhotoProps, "createdAt">, id?: EntityID) {
    const photo: Photo = new Photo(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return photo;
  }
}