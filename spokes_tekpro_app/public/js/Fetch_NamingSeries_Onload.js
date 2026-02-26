$(window).on('hashchange', page_changed);
$(window).on('load', page_changed);
$(function() {
	$('.dropdown-help').hide();  // or .remove();
});
function page_changed(event) {
        frappe.after_ajax(function () {
                var route = frappe.get_route();
                if (route[0] == "Form") {
                        frappe.ui.form.on(route[1], {
                                onload: function (frm,cdt,cdn) {
                                          if(frm.get_docfield('naming_series_definition')&& frappe.session.user !== 'Administrator'&& frm.doc.creation === undefined){
                                                 frm.set_df_property("naming_series", "read_only", 1);
                                                frappe.call({
                                                    method: "frappe.client.get",
                                                    args: {
                                                    doctype: 'Naming Series Manager',
                                                    filters: {"allow":frm.doc.doctype,"username":frappe.session.user}
                                                    },
                                                    callback(r) {
                                                        console.log(r);
                                                        frappe.call({
                                                            method: "frappe.client.get",
                                                            args: {
                                                            doctype: 'Naming Series Manager',
                                                            name:r.message.document_name
                                                            },
                                                            callback(r) {
                                                                if(r.message) {
                                                                    var task = r.message;
                                                                    var newoption = new Array();
                                                                    var newoption1 = new Array();
                                                                    frappe.call({
                                                                        method: "frappe.client.get",
                                                                        args: {
                                                                            doctype: "Naming Series Definition",
                                                                            name:route[1]
                                                                        },
                                                                        callback: function (ret){
                                                                            var define=ret;
									   //if(frm.get_docfield('unit_doc_type')&& frappe.session.user !== 'Administrator'&& frm.doc.creation === undefined)
									   //{
									//	frm.set_value('unit_doc_type',task.name)
                                                                          // }
									    for(var i=0;i<task.series_list.length;i++)
                                                                            {
                                                                                if(task.series_list[i].ischecked === 1)
                                                                                {
                                                                                    for(var j=0;j<define.message.series_list_definition.length;j++)
                                                                                    {
                                                                                        if(define.message.series_list_definition[j].series_name === task.series_list[i].series_name){
                                                                                            newoption1.push(define.message.series_list_definition[j].definition);
                                                                                            newoption.push(task.series_list[i].series_name);
                                                                                        }
                                                                                    }
                                                                                }
                                                                                if(task.series_list[i].isdefault === 1)
                                                                                {
//                                                                                    newoption=new Array();
//                                                                                    newoption1=new Array();
                                                                                    for(var j=0;j<ret.message.series_list_definition.length;j++)
                                                                                    {
                                                                                        if(ret.message.series_list_definition[j].series_name === task.series_list[i].series_name){
                                                                                              frm.set_value('naming_series_definition', ret.message.series_list_definition[j].definition)
//                                                                                            newoption1.push(ret.message.series_list_definition[j].definition);
//                                                                                            newoption.push(task.series_list[i].series_name);
 
                                                                                            break;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                            frm.set_df_property('naming_series_definition', 'options', newoption1);
                                                                            frm.set_df_property('naming_series', 'options', newoption);
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                            if(frm.get_docfield('naming_series_definition')&& frappe.session.user === 'Administrator'&& frm.doc.creation === undefined){
                                                frm.set_df_property("naming_series", "read_only", 1);
                                                var newoption1 = new Array();
                                                frappe.call({
                                                    method: "frappe.client.get",
                                                    args: {
                                                        doctype: "Naming Series Definition",
                                                        name:route[1]
                                                        },
                                                        callback: function (ret){
                                                            var define=ret;
                                                            for(var j=0;j<define.message.series_list_definition.length;j++)
                                                            {
                                                                newoption1.push(define.message.series_list_definition[j].definition);
                                                            }
                                                            frm.set_df_property('naming_series_definition', 'options', newoption1);
                                                    }
                                                });
                                            }
                                },
                                naming_series_definition:function(frm,cdt,cdn){
                                    if(frm.get_docfield('naming_series_definition') && frm.doc.naming_series_manager !== '' && frm.doc.naming_series_definition !== ''){
                                        frappe.call({
                                            method: "frappe.client.get",
                                            args: {
                                                doctype: "Naming Series Definition",
                                                name:route[1]
                                            },
                                            callback: function (ret){
                                                var def=ret;
						//if(frm.get_docfield('unit_doc_type')&& frm.doc.naming_series_manager !== '' && frm.doc.naming_series_definition !== '')
                                                //{
                                                 //  frm.set_value('unit_doc_type',def.name)
                                                //}
                                                for(var j=0;j<def.message.series_list_definition.length;j++)
                                                {
                                                    if(def.message.series_list_definition[j].definition === frm.doc.naming_series_definition){
                                                        frm.set_value('naming_series', def.message.series_list_definition[j].series_name)
                                                    }
                                                }   
                                            }
                                        })
                                    }
                                }
                        })
                }
        })
}






