export interface ICities{
    geoname_id: number
    name: string
    cou_name_en: string
    ascii_name:string
    alternate_names:string
    population:number
    timezone:string
    coordinates:{
        lon:number
       lat:number
    }
    
}
    