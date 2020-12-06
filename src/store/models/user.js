import { Model } from '@vuex-orm/core'

export default class User extends Model {
  static entity = 'users'

  static primaryKey = 'id'

  static fields () {
    return {
      id: this.string(),
      tag: this.string(),
      discriminator: this.string(),
      avatar: this.string(null).nullable(),
      bot: this.boolean(false),
      leftServer: this.boolean(false),
      banned: this.boolean(false),
      clanMember: this.boolean(false),
      vip: this.boolean(false),
      createdAt: this.string()
    }
  }

  get name () {
    const hash = `#${this.discriminator}`
    if (this.tag.endsWith(hash)) return this.tag.slice(0, this.tag.length - hash.length)
    return this.tag
  }

  get avatarUrl () {
    const cdn = `https://cdn.discordapp.com/`
    const ext = this.avatar && this.avatar.startsWith('a_') ? 'gif' : 'jpg'
    if (this.avatar) return `${cdn}avatars/${this.id}/${this.avatar}.${ext}`
    return `${cdn}embed/avatars/${Number(this.discriminator) % 5}.png`
  }

  get avatarFullUrl () {
    const cdn = `https://cdn.discordapp.com/`
    const ext = this.avatar && this.avatar.startsWith('a_') ? 'gif' : 'jpg'
    if (this.avatar) return `${cdn}avatars/${this.id}/${this.avatar}.${ext}`
    return `${cdn}embed/avatars/${Number(this.discriminator) % 5}.png`
  }
}
