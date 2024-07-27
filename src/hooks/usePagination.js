import { computed, ref, unref } from 'vue'

function pagination(list, pageNo = 1, pageSize = 10) {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(pageSize))
  return ret
}

export function usePagination(list = [], pageSize = 10) {
  const currentPage = ref(1)
  const pageSizeRef = ref(pageSize)

  const getPaginationList = computed(() => {
    return pagination(unref(list), unref(currentPage), unref(pageSizeRef))
  })

  const getTotal = computed(() => {
    return unref(list).length
  })

  function setCurrentPage(page = 1) {
    currentPage.value = page
  }

  function setPageSize(pageSize = 10) {
    pageSizeRef.value = pageSize
  }

  return { setCurrentPage, getTotal, setPageSize, getPaginationList }
}
