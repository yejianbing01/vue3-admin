<template>
  <t-dialog 
    width="900px" 
    :header="dialogHeader"
    :visible="visible" 
    @close="$emit('close')" 
    @confirm="onConfirm"
  >
    <t-form v-if="user" ref="form" :data="user" :rules="rules">
      <t-form-item label="用户名" name="username" initial-data="TDesign">
        <t-input placeholder="请输入内容" v-model="user.username" />
      </t-form-item>
      <t-form-item label="昵称" name="nickname" initial-data="TDesign">
        <t-input placeholder="请输入内容" v-model="user.nickname" />
      </t-form-item>
      <t-form-item label="角色" name="roles" initial-data="TDesign">
        <t-select v-model="user.roles" :options="options" clearable multiple>
        </t-select>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script lang="ts" setup>
import type { UserCreateRequest, UserType } from '@/api/type';
import { ROLE_DICT } from '@/config/role.config';
import type { FormInstanceFunctions, FormRules } from 'tdesign-vue-next/es/form/type';
import { computed, ref, watch, type Ref } from 'vue';

interface Props {
  visible: boolean
  data: UserType | null
}
const rules: FormRules<UserCreateRequest> = {
  username: [{ required: true, message: '用户名不允许为空', trigger: 'blur' }],
  nickname: [{ required: true, message: '昵称不允许为空', trigger: 'blur' }],
}

const getDefaultData = (): UserType => ({
  id: '',
  username: '',
  nickname: '',
  roles: [],
  permissions: []
})

const props = withDefaults(defineProps<Props>(), { visible: false }) 
const user: Ref<UserType> = ref(props.data || getDefaultData() )
const form: Ref<FormInstanceFunctions | null> = ref(null)

const emit = defineEmits(['close','confirm'])

const dialogHeader = computed(() => props.data?.id ? '编辑用户' : '创建用户')
const options = computed(() => {
  return Object.entries(ROLE_DICT).map(([value, label]) => ({ label, value }))
})

watch(props, (newProps) => {
  user.value = newProps.data || getDefaultData()
})

const onConfirm = async () => {
  const validateRes = await form.value?.validate()
  if(validateRes !== true) return
  emit('confirm', user, user.value.id)
}

</script>

<style lang="" scoped>

</style>