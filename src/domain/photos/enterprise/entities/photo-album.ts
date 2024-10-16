import { Entity } from "@/core/entities/entity";
import { EntityID } from "@/core/entities/entity-id";
import { Optional } from "@/core/types/optional";

interface PhotoAlbumProps {
  photoId: EntityID;
  albumId: EntityID;
  createdAt: Date;
  updatedAt?: Date;
  inactivatedAt?: Date;
}

export class PhotoAlbum extends Entity<PhotoAlbumProps> {
  get photoId(): EntityID {
    return this.props.photoId;
  }

  get albumId(): EntityID {
    return this.props.albumId;
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

  static create(props: Optional<PhotoAlbumProps, "createdAt">, id?: EntityID) {
    const photoAlbum: PhotoAlbum = new PhotoAlbum(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return photoAlbum;
  }
}