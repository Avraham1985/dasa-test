using IsracardAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace IsracardAPI.Controllers
{
    public class SessionController : ApiController
    {
        [HttpPost]
        [Route("api/session/addItem")]
        public IHttpActionResult AddItemToSession(Item model)
        {
            List<Item> items = null;
            try
            {
                if ((HttpContext.Current.Session["Items"] as List<Item>) == null)
                {
                    items = new List<Item>();
                    items.Add(model);

                    HttpContext.Current.Session.Add("Items", items);
                    return Ok($"user {model.name} saved successfully in session.");
                }
                else
                {
                    items = HttpContext.Current.Session["Items"] as List<Item>;
                    if (items != null)
                    {
                        if (items.FirstOrDefault(x => x.id == model.id) == null)
                        {
                            items.Add(model);
                            HttpContext.Current.Session.Add("Items", items);
                            return Ok($"user {model.name} saved successfully in session.");
                        }
                        else
                            return BadRequest($"item {model.name} allready exsist in session.");
                    }
                    else
                        return BadRequest("session is null");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/session/getSessionItems")]
        public IHttpActionResult GetSessionItems()
        {
            try
            {
                if ((HttpContext.Current.Session["Items"] as List<Item>) != null)
                {
                    List<Item> list = HttpContext.Current.Session["Items"] as List<Item>;
                    return Ok(list);
                }
                return BadRequest("session is null");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
