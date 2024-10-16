import { HealthUseCase } from './health'

let sut: HealthUseCase

describe(HealthUseCase.name, () => {
  beforeEach(() => {
    sut = new HealthUseCase()
  })

  it('should be able to get the app version', async () => {
    const result = await sut.execute()

    expect(result.isLeft()).to.be.false
    expect(result.isRight()).to.be.true
    expect((result.value as { version: string }).version).to.be.equal(
      process.env.npm_package_version
    )
  })
})
