import { Entity } from "@/core/entities/entity";
import { EntityID } from "@/core/entities/entity-id";
import { Optional } from "@/core/types/optional";

interface AlbumProps {
  descripition: string;
  clientId: EntityID;
  createdAt: Date;
  updatedAt?: Date;
  inactivatedAt?: Date;
}

export class Album extends Entity<AlbumProps> {
  get descripition(): string {
    return this.props.descripition;
  }

  get clientId(): EntityID {
    return this.props.clientId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get inactivatedAt(): Date | undefined {
    return this.props.inactivatedAt;
  }

  set inactivatedAt(inactivatedAt: Date | undefined) {
    this.props.inactivatedAt = inactivatedAt;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<AlbumProps, "createdAt">, id?: EntityID) {
    const album: Album = new Album(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return album;
  }
}