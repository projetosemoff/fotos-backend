import { Entity } from '@/core/entities/entity'
import { EntityID } from '@/core/entities/entity-id'
import { Optional } from '@/core/types/optional'

interface ClientPhotographerProps {
  photographerId: EntityID
  clientId: EntityID
  createdAt: Date
  inactivatedAt?: Date
}

export class ClientPhotographer extends Entity<ClientPhotographerProps> {
  get photographerId(): EntityID {
    return this.props.photographerId
  }

  get clientId(): EntityID {
    return this.props.clientId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get inactivatedAt(): Date | undefined {
    return this.props.inactivatedAt
  }

  set inactivatedAt(inactivatedAt: Date | undefined) {
    this.props.inactivatedAt = inactivatedAt
  }

  static create(
    props: Optional<ClientPhotographerProps, 'createdAt'>,
    id?: EntityID
  ) {
    const clientPhotographer: ClientPhotographer = new ClientPhotographer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return clientPhotographer
  }
}
