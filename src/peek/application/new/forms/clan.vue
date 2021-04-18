<template>
  <div>
    <div class="form-group">
      <label for="clanApplicationAge">How old are you?</label>
      <input v-model.number="formData.age" min="0" type="number" id="clanApplicationAge" class="form-control" aria-describedby="clanApplicationAgeHelpBlock" />
      <small id="clanApplicationAgeHelpBlock" class="form-text text-muted">
        Do not lie! If you are found out be to be lying, you will be permenently denied from applications.
      </small>
    </div>
    <div class="form-group">
      <label for="clanApplicationHours">How many hours do you have on Garry's Mod?</label>
      <input v-model.number="formData.hours" min="0" type="number" id="clanApplicationHours" class="form-control" aria-describedby="clanApplicationHoursHelpBlock" />
      <small id="clanApplicationHoursHelpBlock" class="form-text text-muted">
        You can check either on your steam profile, our in your steam Library.
      </small>
    </div>
    <div class="form-group">
      <label for="clanApplicationSteamId">What is your SteamID64? (i.e. 76561198037289710)</label>
      <input v-model="formData.steamid" type="text" id="clanApplicationSteamId" class="form-control" aria-describedby="clanApplicationSteamIdHelpBlock" />
      <small id="clanApplicationSteamIdHelpBlock" class="form-text text-muted">
        Failure to give the correct 64-bit format will result in a deny.
      </small>
    </div>
    <div class="form-group">
      <label for="clanApplicationWarns">How many warns do you have on Fudgy's DarkRP Server?</label>
      <input v-model.number="formData.warns" min="0" type="number" id="clanApplicationWarns" class="form-control" />
    </div>
    <div class="form-group">
      <label for="clanApplicationWarnsProof" class="form-label">Please provide screenshot proof of your warns.</label>
      <input
        class="form-control-file"
        type="file"
        id="clanApplicationWarnsProof"
        multiple
         @change="filesUploaded"
        />
    </div>
    <button
      type="button"
      class="btn btn-primary btn-block"
      :disabled="!canSubmit"
      @click="$emit('submit')"
    >
      Submit
    </button>
  </div>
</template>
<script>
export default {
  props: ['value'],
  computed: {
    formData: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
        this.$emit('changed', value)
      }
    },
    canSubmit () {
      const data = this.formData
      const age = data.age, hours = data.hours, steamid = data.steamid, warns = data.warns, uploads = data.uploads

      const notUndefined = (value) => value !== undefined

      const setAge = notUndefined(age) && (age > 0)
      const setHours = notUndefined(hours) && (hours > 0)
      const setSteamId = notUndefined(steamid) && (steamid.length === 17)
      const setWarns = notUndefined(warns)
      const setFile = notUndefined(uploads) && (uploads.length > 0)

      return setAge && setHours && setSteamId && setWarns && setFile
    }
  },
  methods: {
    filesUploaded ({ target }) {
      const self = this
      if (!target.files.length) return

      let files = []
      this.$set(this.formData, 'uploads', [])

      Array
        .from(Array(target.files.length).keys())
        .map(async i => {
          let reader = new FileReader()
          reader.onloadend = function () {
            files.push(reader.result)
            self.$set(self.formData, 'uploads', files)
          }
          await reader.readAsDataURL(target.files[i])
        })
    }
  }
}
</script>
