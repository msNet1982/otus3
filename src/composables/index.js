import { ref, computed } from 'vue'
import axios from 'axios'
import { useMutation } from '@tanstack/vue-query'

const url = "https://fakestoreapi.com/products"
const urlEchoServer = "https://httpbin.org/anything"

export const isAuth = ref(false)
export const productList = ref([])
export const cart = ref([])

export const totalCount = computed(() => cart.value.reduce((count, item) => count + item.count, 0))

export const totalPrice = computed(() => Math.round(cart.value.reduce((price, item) => price + useInformProduct(item.id)[0].price * item.count, 0)*100)/100)

export const getProducts = async () => {
    const res = await axios.get(url)
    return res.data
}

export const useChangeDataServer = () => {
    const { isPending, isError, isSuccess, mutate } = useMutation({
        mutationFn: (data) => axios.post(urlEchoServer, data)
    })

    return { isPending, isError, isSuccess, mutate }
}

//функция увеличения/уменьшения товара в корзине.
export const useChangeToCart = (idProduct, type) => {
    //определяем, если хоть один данный товар уже в корзине
    if (cart.value.some(product => product.id == idProduct)) {
        if (type === "dec") {
            cart.value.forEach(product => {
                if (product.id == idProduct) product.count++
            })
        }
        else if (type === "inc") {
            cart.value.forEach(product => {
                if (product.id == idProduct) product.count--
            })
            cart.value = cart.value.filter(product => product.count !== 0)
        }
    }
    else cart.value.push({"id": idProduct, "count": 1})
}

//получаем инфу о характеристиках товара по его ID
export const useInformProduct = (id) => {
    return productList.value.filter(product => product.id == id)
}