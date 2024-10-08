import React from 'react'

export default function Invoices() {

    function printInvoice(){
        window.print();
    }    return <>
    
    <div class = "invoice-wrapper" id = "print-area">
            <div class = "invoice">
                <div class = "invoice-container">
                    <div class = "invoice-head">
                        <div class = "invoice-head-top">
                            <div class = "invoice-head-top-left text-start">
                                <img src = "images/logo.png"/>
                            </div>
                            <div class = "invoice-head-top-right text-end">
                                <h3>فاتورة حجز</h3>
                            </div>
                        </div>
                        <div class = "hr"></div>
                        <div class = "invoice-head-middle">
                            <div class = "invoice-head-middle-left text-start">
                                <p><span class = "text-bold">رقم الفاتورة</span>: 1001</p>
                                <p><span class = "text-bold">رقم الحجز</span>: 2001</p>
                                <p><span class = "text-bold">تاريخ الحجز</span>: 05/12/2020</p>
                            </div>
                            <div class = "invoice-head-middle-right text-end">
                                <p><span class = "">منتجع اليت السياحي </span><i class="fa-solid fa-hotel ps-2"></i></p>
                                 <p><span class = ""> 091000000/09200000</span> <i class="fa-solid fa-phone ps-2"></i></p>
                                 <p><span class = ""> info@elete.com </span><i class="fa-solid fa-envelope ps-2"> </i></p>

                            </div>
                        </div>
                        <div class = "hr"></div>
                        <div class = "invoice-head-bottom">
                            <div class = "invoice-head-bottom-left">
                                <ul>
                                    <li class = 'text-bold pb-3'>: الدفع إلى</li>
                                    <li class="pb-1"> <span class=" text-bold ps-2 ">قيمة الضمان: </span> 800  </li>
                                    <li class="pb-1"> <span class=" text-bold ps-2 pb-1">  تسليم الضمان : </span>في المكتب </li>
                                    <li class="pb-1"> <span class=" text-bold ps-2 pb-1"> تاريخ الدخول:  </span> 10/10/2024  </li>
                                    <li class="pb-1"> <span class=" text-bold ps-2 pb-1"> وقت الدخول:  </span> 02:00:00 </li>
                                    <li class="pb-1"> <span class=" text-bold ps-2 pb-1"> تاريخ الخروج:  </span> 10/10/2024  </li>
                                    <li> <span class=" text-bold ps-2 pb-3"> وقت الخروج:  </span> 02:00:00 </li>
                                </ul>
                            </div>
                            <div class = "invoice-head-bottom-right">
                                <ul class = "text-end">
                                    <li class = 'text-bold pb-3' >: الفاتورة إلى</li>
                                    <li class="pb-1"> <span class=" text-bold ps-2 "> اسم الضيف: </span>محمد علي  </li>
                                    <li class="pb-1"> <span class=" text-bold ps-2">  رقم الضيف: </span>0927151075 </li>
                                    <li class="pb-1"> <span class=" text-bold ps-2"> عنوان الضيف: </span> طرابلس  </li>
                                    <li class="pb-1"> <span class=" text-bold ps-2"> عدد الضيوف: </span> 8 </li>
                                    <li class=" ">
                                        
                                        <span>A1</span>
                                        <span class="text-bold ps-2">:أسم الساليه</span>
                                    </li>

                                    
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class = "">
                        <div class = "invoice-body">
                            <table>
                                <thead class=" text-center">
                                    <tr>
                                        <td class = "text-bold">الإجمالي</td>
                                        <td class = "text-bold">عدد الأيام </td>
                                        <td class = "text-bold">السعر في اليوم</td>
                                        <td class = "text-bold">الخدمة</td>

                                    </tr>
                                </thead>
                                <tbody class=" text-center">
                                    <tr>
                                        <td>500</td>
                                        <td>2</td>
                                        <td>250 <span></span></td>
                                        <td>عربون إقامة عادية</td>

                                        
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>500</td>
                                        <td>25</td>
                                        <td>10</td>
                                        <td>25</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>500</td>
                                        <td>25</td>
                                        <td>10</td>
                                        <td>25</td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                            <div class = "invoice-body-bottom">
                                <div class = "invoice-body-info-item border-bottom">
                                    <div class = "info-item-td text-center pe-5 ">500 دل</div>
                                    <div class = "info-item-td  text-bold">المجموع </div>
                                </div>
                                <div class = "invoice-body-info-item border-bottom">
                                    <div class = "info-item-td text-center pe-5 ">10%</div>
                                    <div class = "info-item-td  text-bold">التخفيض</div>

                                </div>
                                <div class = "invoice-body-info-item">
                                    <div class = "info-item-td text-center  pe-5">دل 21365.00</div>
                                    <div class = "info-item-td  text-bold">الإجمالي</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class=" invoice-head-bottom">

                        <div class = "pt-3">
                            <div class = "invoice-body-info-items  ">
                                <div class = " text-center pe-5 ">500 دل</div>
                                <div class = "  text-bold">المدفوع </div>
                                
                            </div>
                            <div class = "invoice-body-info-items pt-3 ">
                                <div class = " text-center pe-5  "> <span class="inov-bg"> 200 دل</span></div>
                                <div class = "  text-bold">باقي قيمة الحجز </div>
                                
                            </div>
                            <div class = "invoice-body-info-items pt-3 ">
                                <div class = " text-center pe-5  "> <span class=" inov-bg"> 10/10/2024</span></div>
                                <div class = "  text-bold">اخر مهلة لدفع باقي االيقمة </div>
                                
                            </div>
                        </div>


                        <div class=" text-end">

                            <img
                                src="./images/qrcode.png"
                                class="w-25"
                                alt=""
                            />
                            
                        </div>


                    </div>
                    <div class = "invoice-foot text-center">
                        <p><span class = "text-bold text-center">NOTE:&nbsp;</span>This is computer generated receipt and does not require physical signature.</p>

                        <div class = "invoice-btns">
                            <button type = "button" class = "invoice-btn"  onClick={() => printInvoice() }>
                                <span>
                                    <i class="fa-solid fa-print"></i>
                                </span>
                                <span>Print</span>
                            </button>
                            <button type = "button" class = "invoice-btn">
                                <span>
                                    <i class="fa-solid fa-download"></i>
                                </span>
                                <span>Download</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </>
}
