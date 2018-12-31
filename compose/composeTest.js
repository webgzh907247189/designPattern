{	
	let that = this
	let compose = function(...args){
		let resultArgsFirst = args.pop()
		return function(...relayArgs){
			return args.reverse().reduce((fnResult,itemFn)=>{
				return fnResult.then((data)=>{
					return itemFn.call(that,data)
				})
			},Promise.resolve(resultArgsFirst.apply(that,relayArgs))) 
		}
	}



	let getCustomerAddress = () => HTTP.get('/basic/tenant/getAddress.do').then(res => {
		// let {address:{data:{
		// 	region,region_id,city,city_id,county,county_id
		// 	} = {}
		// } = {}} = res.data || {};

        /**
           * mock数据
           */
        let objData = {
            "region": "广东",
            "region_id": "440000",
            "city": "广州",
            "city_id": "440100",
            "county": "XX",
            "county_id": "440112"
        }
        let { region,region_id,city,city_id,county,county_id } = objData

	    let provincesObj = {
	        region,
	        region_id
	    }

        let cityMessage = {
            city,
            city_id
        }

        let countyMessgae = {
            county,
            county_id
        }

        return {
        	provincesObj,cityMessage,countyMessgae
        }
	})
	let getProvinces = () => HTTP.post('/basic/area/getProvince').then(res => {
      	console.log('省列表', res.data)
      	this.provinces = res.data
      	return res.data
    })

	let getCity = ({provincesObj:{region_id} = {},cityMessage,countyMessgae}) =>  HTTP.post(`/basic/area/getCity/${region_id}`).then(res => {

      	/* 填充市 */
      	that.currentCity = res.data.find((item)=>{
	    	return item.id == cityMessage.city_id
	  	})

	  	return countyMessgae
    })

	let getCountry = ({county_id}) => HTTP.post(`/basic/area/getArea/${county_id}`).then(res => {
      	console.log('区列表', res.data)

      	/* 填充区 */
      	return that.currentArea = res.data.find((item)=>{
          return item.id == county_id
        })
    })
    
    let promiseResult = () => Promise.all([getCustomerAddress(), getProvinces()]).then((dataList)=>{
		let [{provincesObj,cityMessage,countyMessgae}, provincesList] = dataList

		/* 填充省 */
		that.currentProvince = provincesList.find((item)=>{
		return item.id == provincesObj.region_id
		})

		return {provincesObj, cityMessage, countyMessgae}
	}) 


	let fns = compose(getCountry, getCity, promiseResult)
	let result = fns()
}