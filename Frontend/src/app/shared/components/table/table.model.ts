export class tableSettings{
    tableheading: string='';
    columns: string[] = [];
    rows:any[] = [];
    action: actionSettings[]=[];
    isPagination?: boolean=false;
    showAddNew?: showAddNewSettings={isAddNew: false, callBack:()=>{}};
    showActiveInactive: showActiveInactiveSettings={'showActiveBtn': false, 'apiUrl':''};
    isActive?: boolean=false;
    isShort?: boolean=false;
    direction?: string='ASC';
    showCheckbox?: boolean=false;
    constructor(init?: Partial<tableSettings>) {
        Object.assign(this, init);
      }
}
export class actionSettings{
    icon:string | undefined;
    label:string = '';
    color?:string='#4f46e5';
    callBack?: any;
    isHidden?: boolean=false;
    isDisabled?: boolean=false;
    constructor(init?: Partial<actionSettings>) {
        Object.assign(this, init);
      }
}
export class showActiveInactiveSettings{
    'showActiveBtn': boolean= false;
     'apiUrl': string ='';
}
export class showAddNewSettings{
    isAddNew: boolean=false;
    callBack?:any;
}