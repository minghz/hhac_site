/*
 * HHAC Website JavaScript helpers
 */

if (typeof jQuery === "undefined") {
  throw new Error("HHAC's JavaScript requires jQuery")
}

/* UTILS */
function getCurrentWebPage() {
  var currentPath = window.location.pathname;
  var slashIndex = currentPath.lastIndexOf("/");
  if (slashIndex < 0) {
    return currentPath;
  } else {
    return currentPath.substr(slashIndex + 1);
  }
}

/* HEADER */
function populateNavHeader(elementNode) {
  if (typeof elementNode === "undefined") {
    throw new Error("Need an element to insert header into");
  }
  var headerContainer =
    $("<div />").addClass("navbar-header").appendTo(elementNode);
  var headerToggle =
    $("<button />").addClass("navbar-toggle").attr("data-toggle", "collapse")
    .attr("data-target", ".navbar-collapse").appendTo(headerContainer);
  $("<span />").addClass("sr-only")
    .html("Toggle navigation").appendTo(headerToggle);
  $("<i />").addClass("fa fa-bars fa-fw").appendTo(headerToggle);
  $("<a />").addClass("navbar-brand").attr("href", "index.html")
    .html("Hart House Archery Club").appendTo(headerContainer);
}

function populateNavLinks(elementNode) {
  if (typeof elementNode === "undefined") {
    throw new Error("Need an element to insert links into");
  }
  var linksContainer = $("<ul />")
    .addClass("nav navbar-nav navbar-right navbar-collapse collapse")
    .appendTo(elementNode);
  var linkSpec = {
    "Home": "index.html",
    "Waitlist": "waitlist.html",
    "About Us": {
      "Club Info": "clubinfo.html",
      "Tournaments": "tournaments.html",
      "Coaching": "coaching.html",
      "Committee": "committee.html"
    },
    "F.A.Q.": "faq.html"
  };

  var currentPage = getCurrentWebPage();
  // special-case: home-page is equivalent to index.html
  if (currentPage === "") {
    currentPage = "index.html";
  }

  // returns true if this node contains the link to the current page
  function recursivelyAddLinks(elementNode, linkNode, idPrefix) {
    if (typeof elementNode === "undefined") {
      throw new Error("Need an element to insert links into");
    }
    if (typeof linkNode !== "object") {
      throw new Error("Link spec is invalidly formatted");
    }
    idPrefix = idPrefix || "";
    var anySublinkContainsCurrentPage = false;
    for (var link in linkNode) {
      var subLinkSpec = linkNode[link];
      var scrubbedLinkName = link.replace(/\W+/g, '').toLowerCase();
      var linkId = idPrefix + scrubbedLinkName;
      var currentLinkElement = $("<li />").attr("id", linkId)
        .attr("role", "presentation").appendTo(elementNode);
      var currentLinkTag = $("<a />")
        .html(link).appendTo(currentLinkElement);
      var containsCurrentPage = false;
      if (typeof subLinkSpec === "string") {
        // leaf-node, append the link
        currentLinkTag.attr("href", subLinkSpec);
        containsCurrentPage = (subLinkSpec === currentPage);
      } else {
        // dropdown-node
        currentLinkTag.addClass("dropdown-toggle")
          .attr("data-toggle", "dropdown")
          .attr("data-target", "#" + linkId)
          .attr("href", "#").attr("role", "button")
          .attr("aria-haspopup", "true").attr("aria-expanded", false)
          .append("<i class=\"fa fa-caret-down fa-fw\" />")
          .appendTo(currentLinkElement);
        var nextLinkHolder = $("<ul />").addClass("dropdown-menu")
          .appendTo(currentLinkElement);
        containsCurrentPage =
          recursivelyAddLinks(nextLinkHolder, subLinkSpec, linkId + "-");
      }
      if (containsCurrentPage) {
        currentLinkElement.addClass("active");
        anySublinkContainsCurrentPage = true;
      }
    }
    return anySublinkContainsCurrentPage;
  }

  recursivelyAddLinks(linksContainer, linkSpec);
}

function populateNavbar(elementNode) {
  elementNode = $(elementNode || ".navbar");
  elementNode.empty();
  var divContainer = $("<div />")
    .addClass("container-fluid").attr("id", "nav-container")
    .appendTo(elementNode);
  populateNavHeader(divContainer);
  populateNavLinks(divContainer);
}

/* FOOTER */
function populateSocial(elementNode) {
  if (typeof elementNode === "undefined") {
    throw new Error("Need an element to insert social-info into");
  }
  var divContainer = $("<div />")
    .addClass("container").appendTo(elementNode);
  $("<p />").addClass("footer-title")
    .html("<i class=\"fa fa-users\"></i> Social").appendTo(divContainer);
  var linksContainer = $("<div />").addClass("footer-links")
    .appendTo(divContainer);

  var fbRow = $("<div />").addClass("footer-row").appendTo(linksContainer);
  $("<label />").addClass("footer-description")
    .html("<i class=\"fa fa-facebook-square\"></i> Facebook")
    .appendTo(fbRow);
  $("<a />").addClass("footer-link").attr("rel", "nofollow")
    .attr("href", "https://www.facebook.com/pages/" +
                  "Hart-House-Archery-Club/148049781946135")
    .attr("target", "_blank").html("Hart House Archery Club")
    .appendTo(fbRow);

  var twRow = $("<div />").addClass("footer-row").appendTo(linksContainer);
  $("<label />").addClass("footer-description")
    .html("<i class=\"fa fa-twitter-square\"></i> Twitter")
    .appendTo(twRow);
  $("<a />").addClass("footer-link").attr("rel", "nofollow")
    .attr("href", "https://twitter.com/HartHouseArcher")
    .attr("target", "_blank").html("@HartHouseArcher")
    .appendTo(twRow);
}

function populateContact(elementNode) {
  if (typeof elementNode === "undefined") {
    throw new Error("Need an element to insert contact-info into");
  }
  var divContainer = $("<div />")
    .addClass("container").appendTo(elementNode);
  $("<p />").addClass("footer-title")
    .html("<i class=\"fa fa-pencil\"></i> Contact").appendTo(divContainer);
  var linksContainer = $("<div />").addClass("footer-links")
    .appendTo(divContainer);

  var emailRow = $("<div />").addClass("footer-row").appendTo(linksContainer);
  $("<label />").addClass("footer-description")
    .html("<i class=\"fa fa-envelope\"></i> Email")
    .appendTo(emailRow);
  $("<a />").addClass("footer-link")
    .attr("href", "mailto:archery.harthouse@utoronto.ca")
    .html("archery.harthouse@utoronto.ca")
    .appendTo(emailRow);

  var mapRow = $("<div />").addClass("footer-row").appendTo(linksContainer);
  $("<label />").addClass("footer-description")
    .html("<i class=\"fa fa-map-marker\"></i> Address " +
          "<a rel=\"nofollow\" href=\"https://goo.gl/maps/Zniv9\" " +
          "target=\"_blank\"><i class=\"fa fa-link\"></i></a>")
    .appendTo(mapRow);
  $("<p />").addClass("footer-link")
    .html("Hart House Archery Club<br /> " +
          "7 Hart House Circle,<br /> " +
          "Toronto, ON M5S 3H3")
    .appendTo(mapRow);
}

function populateCopyright(elementNode) {
  if (typeof elementNode === "undefined") {
    throw new Error("Need an element to insert copyright into");
  }
  $("<p />").html("<i class=\"fa fa-copyright\"></i> " +
                  "2015 Akshay Ganeshen. Made with Bootflat, " +
                  "Bootstrap 3, and Font Awesome.")
    .appendTo(elementNode);
}

function populateFooter(elementNode) {
  elementNode = $(elementNode || ".footer");
  elementNode.empty();
  var divContainer = $("<div />")
    .addClass("container").attr("id", "footer-container")
    .appendTo(elementNode);
  var divRow = $("<div />").addClass("row").appendTo(divContainer);
  var col1 = $("<div />").addClass("col-sm-6").appendTo(divRow);
  var col2 = $("<div />").addClass("col-sm-6").appendTo(divRow);
  populateSocial(col1);
  populateContact(col2);
  var copyrightRow = $("<div />").addClass("footer-copyright")
    .appendTo(elementNode); // not appended to the container - looks weird
  populateCopyright(copyrightRow);
}
